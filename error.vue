<template>
    <div class="h-screen flex flex-col justify-center items-center">
        <div class="flex flex-col items-center">
            <div class="text-indigo-500 font-bold text-7xl">
                404
            </div>
    
            <div class="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
                This page does not exist
            </div>
    
            <div class="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-8">
                The page you are looking for could not be found.
            </div>
        </div>
        <!-- <button @click="$router.back()" class="mt-8 px-4 py-2 bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 transition duration-150 ease-in-out">
            Go Back
        </button> -->
    
        <div class="flex flex-col items-center mt-8">
            <nuxt-link to="/" class="text-indigo-500 font-medium text-sm md:text-xl lg:text-2xl">
                Go to Home
            </nuxt-link>
        </div>
    </div>
</template>