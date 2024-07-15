<template>
    <div class="h-[calc(100vh-250px)] flex flex-col justify-center items-center">
        <div class="text-center">
            <h1 class="mb-4 text-6xl font-semibold text-green-500">404</h1>
            <p class="mb-4 text-lg text-gray-600">Oops! Page not found.</p>
            <div class="animate-bounce">
                <svg class="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
            </div>
            <p class="mt-4 text-gray-600">Let's get you back
                <nuxt-link to="/" class="text-green-500">
                    Go to Home
                </nuxt-link>
            </p>
        </div>
    </div>
</template>