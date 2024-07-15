export type User = {
	name?: string;
	email?: string;
};

export type LoginCredentials = {
	email: string;
	password: string;
};

// api endpoint
const LOGIN = '/login';
const LOGOUT = '/logout';
const CURRENT_USER = '/current-user';

// Value is initialized in: ~/plugins/auth.ts
export const useUser = () => {
	return useState<User | undefined | null>('user', () => undefined);
};

export const useAuth = () => {
	const router = useRouter();

	const user = useUser();
	const isLoggedIn = computed(() => !!user.value);
	const cookie = useCookie($X_TOKEN);

	async function refresh() {
		try {
			user.value = await fetchCurrentUser();
		} catch {
			user.value = null;
		}
	}

	async function login(credentials: LoginCredentials) {
		if (isLoggedIn.value) return;

		const response: any = await $http(LOGIN, { method: 'post', body: credentials });
		cookie.value = response.data?.access_token;
		return response;
	}

	async function logout() {
		if (!isLoggedIn.value) return;
		$http(LOGOUT);
		user.value = null;
		cookie.value = null;
		await router.push('/');
	}

	return {
		user,
		isLoggedIn,
		login,
		logout,
		refresh
	};
};

export const fetchCurrentUser = async () => {
	try {
		return await $http<User>(CURRENT_USER, {
			redirectIfNotAuthenticated: false
		});
	} catch (error: any) {
		if ([401, 400, 419].includes(error?.response?.status)) return null;
		console.error(error);
	}
};