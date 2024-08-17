<script setup>
    const showingNavigationDropdown = ref(false);
    const { agent_user = {}, logout } = agentAuth();
    // console.log(agent_user);
    const profile_image = ref('');
    async function getProfileImage() {
        try {
            const response = await $fetchAgent(agent_user.value?.data.user.profile_image, {
                method: 'GET',
                responseType: 'blob', // Set the response type to 'blob'
            });

            // Convert the Blob response to a URL
            const imageUrl = URL.createObjectURL(response);
            profile_image.value = imageUrl;
        } catch (error) {
            console.log(error);
        }
    }
    onMounted(() => {
        getProfileImage();
    });
</script>
<template>
    <!-- <pre>{{ agent_user.data.office }}</pre> -->
    <nav class="h-[75px] dark:bg-gray-800 dark:bg-[linear-gradient(to_right,#333333,#000000)] bg-[#F1F6FF] border-b border-gray-100 dark:border-gray-700 z-[60] top-0">
        <!-- Primary Navigation Menu -->
        <div class="mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div class="flex justify-between h-full">
                <div class="flex">
                    <!-- Logo -->
                    <div class="shrink-0 flex items-center">
                        <NuxtLink href="/">
                            <ApplicationLogo :width="'50px'" :height="'100%'" />
                        </NuxtLink>
                    </div>
                </div>

                <div class="hidden sm:flex sm:items-center sm:ml-6">
                    <div class="ml-3 relative">
                        <Dropdown align="right" width="48">
                            <template #trigger>
                                <span class="inline-flex rounded-md">
                                    <button type="button"
                                        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-transparent dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150">
                                        <img class="h-8 w-8 rounded-full object-cover" :src="profile_image ?? '/img/profile-image.png'" :class="!profile_image ? 'bg-gray-200 p-1' : ''"
                                            alt="profile_image" 
                                        />
                                        <span class="pr-2 pl-2">{{ agent_user?.data?.user.first_name + ' ' +agent_user?.data?.user.last_name }}</span>
                                    </button>
                                </span>
                            </template>

                            <template #content>
                                <div class="py-2 border-b border-gray-200 dark:border-gray-600">
                                    <div class="px-4">
                                        <div class="font-medium text-sm text-gray-800 dark:text-gray-200">
                                            {{ agent_user?.data?.user.first_name + ' ' + agent_user?.data?.user.last_name }}
                                        </div>
                                        <div class="font-medium text-sm text-gray-500">{{ agent_user?.data?.user?.email }}</div>
                                    </div>
                                </div>
                                <!-- <DropdownLink href="/home"> Home </DropdownLink> -->
                                <button type="button" @click="logout"
                                    class="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out">
                                    Log Out
                                </button>
                            </template>
                        </Dropdown>
                    </div>
                </div>
                <!-- Hamburger -->
                <div class="-mr-2 flex items-center sm:hidden">
                    <button @click="showingNavigationDropdown = !showingNavigationDropdown"
                        class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out">
                        <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path :class="{
                                hidden: showingNavigationDropdown,
                                'inline-flex': !showingNavigationDropdown
                            }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                            <path :class="{
                                hidden: !showingNavigationDropdown,
                                'inline-flex': showingNavigationDropdown
                            }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Responsive Navigation Menu -->
        <div :class="{ block: showingNavigationDropdown, hidden: !showingNavigationDropdown }" class="sm:hidden bg-[#F1F6FF] z-50 relative border-t border-gray-200">
            <!-- <div class="pt-2 pb-3 space-y-1">
                <ResponsiveNavLink href="/home"> Home </ResponsiveNavLink>
            </div> -->

            <!-- Responsive Settings Options -->
            <div class="pt-4 pb-1">
                <div class="px-4 pb-4 border-b border-gray-200 dark:border-gray-600">
                    <div class="font-medium text-base text-gray-800 dark:text-gray-200">
                        {{ agent_user?.data?.user.first_name + ' ' + agent_user?.data?.user.last_name }}
                    </div>
                    <div class="font-medium text-sm text-gray-500">{{ agent_user?.data?.user?.email }}</div>
                </div>

                <div class="mt-3 space-y-1">
                    <!-- <ResponsiveNavLink href="/home"> Home </ResponsiveNavLink> -->
                    <button type="button" @click="logout"
                        class="block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:text-gray-800 dark:focus:text-gray-200 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 dark:focus:border-gray-600 transition duration-150 ease-in-out">
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Page Heading -->
    <header class="bg-white dark:bg-gray-800 shadow" v-if="$slots.header">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <slot name="header" />
        </div>
    </header>
</template>