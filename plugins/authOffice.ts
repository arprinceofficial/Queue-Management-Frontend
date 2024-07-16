import { fetchOfficeCurrentUser, officeUser } from "~/composables/officeAuth";

export default defineNuxtPlugin(async () => {
  const office_user = officeUser();
  if (office_user.value !== undefined) return;
  office_user.value = await fetchOfficeCurrentUser();
});
