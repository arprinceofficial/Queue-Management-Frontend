export default defineNuxtRouteMiddleware(async () => {
	const office_user = officeUser();
	const agent_user = agentUser();
	const admin_user = adminUser();
	if (office_user.value) return navigateTo('/home', { replace: true });
	if (agent_user.value) return navigateTo('/agent-panel', { replace: true });
	if (admin_user.value) return navigateTo('/admin-panel', { replace: true });
});
