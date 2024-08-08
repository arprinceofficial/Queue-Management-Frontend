export default defineNuxtPlugin(() => {
    return {
        provide: {
            // Office API Endpoints
            api_office_queue_services: 'queue-services',
            api_office_queue_vouchers_store :'queue-services-create',
            api_office_queue_vouchers_waiting_screen: 'queue-vouchers/waiting-screen',

            // Agent API Endpoints
            api_agent_info: 'info',
            api_agent_queue_counters_get_counter: 'get-counter',
            api_agent_queue_counters_set_counter: 'set-counter',
            api_agent_queue_counters_revoke_counter: 'revoke-counter',
            api_agent_queue_vouchers_get_waitinglist: 'queue-vouchers/get-waitinglist',
            api_agent_queue_vouchers_reserve_queue: 'queue-vouchers/reserve-queue',
            api_agent_queue_vouchers_get_reserve_queue: 'queue-vouchers/get-reserve-queue',
            api_agent_queue_vouchers_complete_queue: 'queue-vouchers/complete-queue',
            api_agent_queue_counters_get_online_counter: 'queue-counters/get-online-counter',
            api_agent_queue_vouchers_tranfer_queue: 'queue-vouchers/tranfer-queue',
        }
    };
});