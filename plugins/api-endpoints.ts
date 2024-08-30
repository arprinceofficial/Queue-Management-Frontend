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
            
            api_admin_service_list: 'service-list',
            api_admin_service_create: 'service-create',
            api_admin_service_update: 'service-update',
            api_admin_service_delete: 'service-delete',

            api_admin_office_user_list: 'office-user-list',
            api_admin_office_user_create: 'office-user-create',
            api_admin_office_user_update: 'office-user-update',
            api_admin_office_user_delete: 'office-user-delete',

            api_admin_agent_user_list: 'agent-user-list',
            api_admin_agent_user_create: 'agent-user-create',
            api_admin_agent_user_update: 'agent-user-update',
            api_admin_agent_user_delete: 'agent-user-delete',

            api_admin_queue_service: 'queue-service',
            api_admin_queue_service_list: 'queue-service-list',
            api_admin_queue_service_create: 'queue-service-create',
            api_admin_queue_service_update: 'queue-service-update',
            api_admin_queue_service_delete: 'queue-service-delete',

            api_admin_wt_news_list: 'wt-news-list',
            api_admin_wt_news_create: 'wt-news-create',
            api_admin_wt_news_update: 'wt-news-update',
            api_admin_wt_news_delete: 'wt-news-delete',

            api_admin_wt_video_list: 'wt-video-list',
            api_admin_wt_video_create: 'wt-video-create',
            api_admin_wt_video_update: 'wt-video-update',
            api_admin_wt_video_delete: 'wt-video-delete',

            api_admin_country_list: 'country-list',
            api_admin_country_create: 'country-create',
            api_admin_country_update: 'country-update',
            api_admin_country_delete: 'country-delete',
        }
    };
});