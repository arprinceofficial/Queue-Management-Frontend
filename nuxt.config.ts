// https://nuxt.com/docs/api/configuration/nuxt-config
import legacy from '@vitejs/plugin-legacy'

export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			API_URL_ADMIN: process.env.API_URL_ADMIN,
			API_URL_OFFICE: process.env.API_URL_OFFICE,
			API_URL_AGENT: process.env.API_URL_AGENT,
			API_BASE_URL: process.env.API_BASE_URL,

			FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
			FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
			FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
			FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
			FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
			FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
		}
	},

	app: {
		head: {
			link: [
				// { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
				{ rel: 'icon', type: 'image/x-icon', href: '/queue-fav.png' },
			],
		}
	},

	// css: ['@/assets/tailwindcss.css'],
	css: [
		'~/assets/css/main.css',
		'~/assets/fa-6.4.0/css/all.css',
		'~/assets/scss/themes-basic-v1/style.scss',
	],

	modules: [
		'@nuxtjs/tailwindcss',
		'nuxt-icon',
		'@nuxtjs/color-mode',
		'@vueuse/nuxt',
		"nuxt-marquee",
	],
	plugins: [
		'~/plugins/socketio',
		{ src: '~/plugins/firebase.js', ssr: false }
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
		esbuild: {
			target: 'es2015',
			include: /\.(ts|tsx|js|jsx|vue)$/,
		},
		build: {
			target: 'es2015',
			cssTarget: 'chrome61',
		},
		plugins: [
			legacy({
				targets: ['chrome >= 64', 'edge >= 79', 'safari >= 11.1', 'firefox >= 67'],
				renderLegacyChunks: true,  // Generate legacy chunks for older browsers
				modernPolyfills: ['es/global-this', 'es.global-this', 'es.object.from-entries', 'es.array.flat-map', 'es.array.flat'],  // Add polyfill for globalThis
			}),
		],
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
