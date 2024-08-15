// plugins/socketio.js

import { io } from 'socket.io-client'

export default defineNuxtPlugin((nuxtApp) => {
    if (typeof window !== "undefined") {
        nuxtApp.socket = io(useRuntimeConfig().public.API_BASE_URL)
    }
})
