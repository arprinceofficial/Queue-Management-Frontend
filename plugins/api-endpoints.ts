export default defineNuxtPlugin(() => {
    return {
        provide: {
            // Office API Endpoints
            api_office_queue_services: 'queue-services', // Done
            api_office_queue_vouchers_store :'queue-services-create', // Done
            api_office_queue_vouchers_waiting_screen: 'queue-token/waiting-screen', // Done

            // Agent API Endpoints
            api_agent_info: 'current-user', // Done
            api_agent_queue_counters_get_counter: 'get-counter', // Done
            api_agent_queue_counters_set_counter: 'set-counter', // Done
            api_agent_queue_counters_revoke_counter: 'revoke-counter', // Done
            api_agent_queue_vouchers_get_waitinglist: 'get-waiting-list', // Done (need to fix priority based on the counter)
            api_agent_queue_vouchers_reserve_queue: 'reserve-queue', // Done
            api_agent_queue_vouchers_get_reserve_queue: 'get-reserve-queue', // Done
            api_agent_queue_vouchers_complete_queue: 'complete-queue', // Done
            api_agent_queue_counters_get_online_counter: 'get-online-counter', // Done
            api_agent_queue_vouchers_tranfer_queue: 'tranfer-queue', // Done
            api_agent_queue_vouchers_reject_queue: 'cancel-queue', // Done
        }
    };
});