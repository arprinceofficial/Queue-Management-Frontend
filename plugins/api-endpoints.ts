export default defineNuxtPlugin(() => {
    return {
        provide: {
            // Office API Endpoints
            api_office_queue_services: 'queue-services',
            api_office_queue_vouchers_store :'queue-services-create',
            api_office_queue_vouchers_waiting_screen: 'queue-token/waiting-screen',

            // Agent API Endpoints
            api_agent_info: 'current-user',
            api_agent_queue_counters_get_counter: 'get-counter',
            api_agent_queue_counters_set_counter: 'set-counter',
            api_agent_queue_counters_revoke_counter: 'revoke-counter',
            api_agent_queue_vouchers_get_waitinglist: 'get-waiting-list',
            api_agent_queue_vouchers_reserve_queue: 'reserve-queue',
            api_agent_queue_vouchers_get_reserve_queue: 'get-reserve-queue',
            api_agent_queue_vouchers_complete_queue: 'complete-queue',
            api_agent_queue_counters_get_online_counter: 'get-online-counter',
            api_agent_queue_vouchers_tranfer_queue: 'tranfer-queue',
            api_agent_queue_vouchers_reject_queue: 'cancel-queue',

            // Admin API Endpoints
            api_admin_office_list_all: 'office-list-all',
            api_admin_office_list: 'office-list',
            api_admin_office_create: 'office-create',
            api_admin_office_update: 'office-update',
            api_admin_office_delete: 'office-delete',

            api_admin_counter_list: 'counter-list',
            api_admin_counter_create: 'counter-create',
            api_admin_counter_update: 'counter-update',
            api_admin_counter_delete: 'counter-delete',
            
            api_admin_priority_list: 'priority-list',
            api_admin_priority_create: 'priority-create',
            api_admin_priority_update: 'priority-update',
            api_admin_priority_delete: 'priority-delete',
            
            api_admin_gender_list: 'gender-list',
            api_admin_gender_create: 'gender-create',
            api_admin_gender_update: 'gender-update',
            api_admin_gender_delete: 'gender-delete',

            api_admin_office_user_list: 'office-user-list',
            api_admin_office_user_create: 'office-user-create',
            api_admin_office_user_update: 'office-user-update',
            api_admin_office_user_delete: 'office-user-delete',
        }
    };
});