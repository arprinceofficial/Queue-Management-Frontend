export default defineNuxtRouteMiddleware(async () => {
	const admin_user = adminUser();
	if (!admin_user.value) return navigateTo('/', { replace: true });
});
