export default defineNuxtRouteMiddleware(async () => {
	const office_user = officeUser();
	if (office_user.value) return navigateTo('/home', { replace: true });
});
