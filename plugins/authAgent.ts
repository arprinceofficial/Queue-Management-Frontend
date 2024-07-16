import { fetchAgentCurrentUser, agentUser } from "~/composables/agentAuth";

export default defineNuxtPlugin(async () => {
  const agent_user = agentUser();
  if (agent_user.value !== undefined) return;
  agent_user.value = await fetchAgentCurrentUser();
});
