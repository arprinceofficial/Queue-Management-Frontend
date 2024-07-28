export default defineNuxtPlugin(() => {
    return {
        provide: {
            // Agent API Endpoints
            agent_cms_languages: 'cms/languages',
            // Office API Endpoints
            office_cms_languages: 'cms/languages',
        }
    };
});