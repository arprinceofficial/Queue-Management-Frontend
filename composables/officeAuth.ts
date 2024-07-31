const LOGIN = '/login';
const LOGOUT = '/logout';
const CURRENT_USER = '/info';

export const officeUser = () => {
	return useState('office_user', () => undefined);
};

export const officeAuth = () => {
	const router = useRouter();
	const office_user: any = officeUser();
	const isOfficeLoggedIn = computed(() => !!office_user.value);
	const cookie = useCookie($XO_TOKEN);

	async function login(credentials: any) {
		if (isOfficeLoggedIn.value) return;

		const response: any = await $fetchOffice(LOGIN, { method: 'post', body: credentials });
		cookie.value = response.data?.token;
		return response;
	}

	async function logout() {
		if (!isOfficeLoggedIn.value) return;
		$fetchOffice(LOGOUT, { method: 'get' });
		office_user.value = null;
		cookie.value = null;
		await router.push('/');
	}

	return {
		office_user,
		isOfficeLoggedIn,
		login,
		logout
	};
};

export const fetchOfficeCurrentUser = async () => {
	try {
		return await $fetchOffice(CURRENT_USER, {
			redirectIfNotAuthenticated: false
		});
	} catch (error: any) {
		if ([401, 400, 419].includes(error?.response?.status)) return null;
		// console.log(error);
	}
};