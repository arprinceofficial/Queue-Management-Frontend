export default defineNuxtRouteMiddleware(async () => {
	const agent_user = agentUser();
	if (!agent_user.value) return navigateTo('/agent-login', { replace: true });
});
