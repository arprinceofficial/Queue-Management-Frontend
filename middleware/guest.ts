export default defineNuxtRouteMiddleware(async () => {
	const office_user = officeUser();
	const agent_user = agentUser();
	if (office_user.value) return navigateTo('/home', { replace: true });
	if (agent_user.value) return navigateTo('/customer', { replace: true });

});
