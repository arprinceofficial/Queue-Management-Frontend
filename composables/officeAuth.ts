export type OfficeUser = {
	name?: string;
	email?: string;
};

export type LoginCredentialsOffice = {
	email: string;
	password: string;
};

// api endpoint
const LOGIN = '/login';
const LOGOUT = '/logout';
const CURRENT_USER = '/current-user';

// Value is initialized in: ~/plugins/auth.ts
export const officeUser = () => {
	return useState<OfficeUser | undefined | null>('office_user', () => undefined);
};

export const officeAuth = () => {
	const router = useRouter();

	const office_user = officeUser();
	const isOfficeLoggedIn = computed(() => !!office_user.value);
	const cookie = useCookie($X_TOKEN);

	async function refresh() {
		try {
			office_user.value = await fetchOfficeCurrentUser();
		} catch {
			office_user.value = null;
		}
	}

	async function login(credentials: LoginCredentialsOffice) {
		if (isOfficeLoggedIn.value) return;

		const response: any = await $fetchOffice(LOGIN, { method: 'post', body: credentials });
		cookie.value = response.data?.access_token;
		return response;
	}

	async function logout() {
		if (!isOfficeLoggedIn.value) return;
		$fetchOffice(LOGOUT, { method: 'post' , body: { id: office_user.value?.data?.user?.id } });
		office_user.value = null;
		cookie.value = null;
		await router.push('/');
	}

	return {
		office_user,
		isOfficeLoggedIn,
		login,
		logout,
		refresh
	};
};

export const fetchOfficeCurrentUser = async () => {
	try {
		return await $fetchOffice<OfficeUser>(CURRENT_USER, {
			redirectIfNotAuthenticated: false
		});
	} catch (error: any) {
		if ([401, 400, 419].includes(error?.response?.status)) return null;
		// console.log(error);
	}
};