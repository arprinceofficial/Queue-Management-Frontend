// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			apiURL: process.env.NUXT_PUBLIC_API_URL,
		}
	},

	// css: ['@/assets/tailwindcss.css'],
	css: [
		'~/assets/css/main.css',
		'~/assets/fa-6.4.0/css/all.css'
	],

	modules: [
		'@nuxtjs/tailwindcss',
		'nuxt-icon',
		'@nuxtjs/color-mode',
	],

	colorMode: {
		preference: 'system', // default value of $colorMode.preference
		fallback: 'light', // fallback value if not system preference found
		hid: 'nuxt-color-mode-script',
		globalName: '__NUXT_COLOR_MODE__',
		componentName: 'ColorScheme',
		classPrefix: '',
		classSuffix: '',
		storageKey: 'nuxt-color-mode'
	},

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "@/assets/scss/themes-basic-v1/_style.scss" as *;'
				}
			}
		}
	},

	compatibilityDate: '2024-07-15',
});