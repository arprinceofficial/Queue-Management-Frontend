// api endpoint
const LOGIN = '/login';
const LOGOUT = '/logout';
const CURRENT_USER = '/current-user';

// Value is initialized in: ~/plugins/authAgent.ts
export const agentUser = () => {
	return useState('agent_user', () => undefined);
};

export const agentAuth = () => {
	const router = useRouter();
	const agent_user: any = agentUser();
	const isAgentLoggedIn = computed(() => !!agent_user.value);
	const cookie = useCookie($XA_TOKEN);

	async function login(credentials: any) {
		if (isAgentLoggedIn.value) return;

		const response: any = await $fetchAgent(LOGIN, { method: 'post', body: credentials });
		cookie.value = response.data?.access_token;
		return response;
	}

	async function logout() {
		if (!isAgentLoggedIn.value) return;
		$fetchAgent(LOGOUT, { method: 'post', body: { id: agent_user.value?.data?.user?.id } });
		agent_user.value = null;
		cookie.value = null;
		await router.push('/agent');
	}

	return {
		agent_user,
		isAgentLoggedIn,
		login,
		logout
	};
};

export const fetchAgentCurrentUser = async () => {
	try {
		return await $fetchAgent(CURRENT_USER, {
			redirectIfNotAuthenticated: false
		});
	} catch (error: any) {
		if ([401, 400, 419].includes(error?.response?.status)) return null;
		// console.log(error);
	}
};