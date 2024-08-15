// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			apiURL: process.env.NUXT_PUBLIC_API_URL,
			API_URL_OFFICE: process.env.API_URL_OFFICE,
			API_URL_AGENT: process.env.API_URL_AGENT,
			API_BASE_URL: process.env.API_BASE_URL,
		}
	},

	app: {
		head: {
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
			],
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
		'@vueuse/nuxt',
		"nuxt-marquee",
	],
	plugins: [
		'~/plugins/socketio'
	],
	colorMode: {
		preference: 'light', // default value of $colorMode.preference
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

	devtools: {
		enabled: false,
	},
});
