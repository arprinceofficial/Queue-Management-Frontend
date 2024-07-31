export default defineNuxtPlugin(() => {
    return {
        provide: {
            // Office API Endpoints
            api_office_queue_services: 'queue-services',
            api_office_queue_vouchers_store :'queue-vouchers/store',

            // Agent API Endpoints
            api_agent: '',
        }
    };
});