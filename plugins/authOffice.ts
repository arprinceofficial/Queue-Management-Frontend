import { fetchOfficeCurrentUser, officeUser } from "~/composables/officeAuth";

export default defineNuxtPlugin(async () => {
  const office_user: any = officeUser();
  if (office_user.value !== undefined) return;
  office_user.value = await fetchOfficeCurrentUser();
});
