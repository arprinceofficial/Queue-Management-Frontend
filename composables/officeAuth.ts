import { signInWithPopup } from 'firebase/auth';

// api endpoint
const LOGIN = '/login';
const LOGOUT = '/logout';
const CURRENT_USER = '/current-user';
const SSO_LOGIN = '/sso-login';

// Value is initialized in: ~/plugins/authOffice.ts
export const officeUser = () => {
	return useState('office_user', () => undefined);
};

export const officeAuth = () => {
	const nuxtApp = useNuxtApp();

	const router = useRouter();
	const office_user: any = officeUser();
	const isOfficeLoggedIn = computed(() => !!office_user.value);
	const cookie = useCookie($XO_TOKEN);

	async function login(credentials: any) {
		if (isOfficeLoggedIn.value) return;

		const response: any = await $fetchOffice(LOGIN, { method: 'post', body: credentials });
		cookie.value = response.data?.access_token;
		return response;
	}

	async function officeLoginGoogle() {
		if (isOfficeLoggedIn.value) return;

		const auth = nuxtApp.$auth;
		const provider = new nuxtApp.$GoogleAuthProvider();
		const result = await signInWithPopup(auth, provider);
		// console.log(result);
		const { user } = result;
		const idToken = await user.getIdToken();

		const response: any = await $fetchOffice(SSO_LOGIN, {
			method: 'POST',
			body: { idToken },
		});
		cookie.value = response.data?.access_token;
		return response;
	}

	async function logout() {
		if (!isOfficeLoggedIn.value) return;
		$fetchOffice(LOGOUT, { method: 'GET' });
		office_user.value = null;
		cookie.value = null;
		await router.push('/');
	}

	return {
		office_user,
		isOfficeLoggedIn,
		login,
		logout,
		officeLoginGoogle
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