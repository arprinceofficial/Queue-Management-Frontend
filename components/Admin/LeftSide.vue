<script setup>
    const {  } = useNuxtApp();
    const route = useRoute();
	const current_slug = computed(() => route.params.slug);
    const current_route = computed(() => route.name);
    const current_path = computed(() => route.path);

    const queue_service_list = ref([
        { name: 'Office', icon: 'fas fa-building', route: '/admin-panel/office' },
        { name: 'Office User', icon: 'fas fa-user', route: '/admin-panel/user-office' },
        { name: 'Agent User', icon: 'fas fa-user', route: '/admin-panel/user-agent' },
        { name: 'Counter', icon: 'fas fa-list-ol', route: '/admin-panel/counter' },
        { name: 'Priority', icon: 'fas fa-sort-amount-up-alt', route: '/admin-panel/priority' },
        { name: 'Gender', icon: 'fas fa-venus-mars', route: '/admin-panel/gender' },
        { name: 'Service', icon: 'fas fa-list-alt', route: '/admin-panel/service' },
        { name: 'Queue Service', icon: 'fas fa-list-alt', route: '/admin-panel/queue-service' },
        { name: 'WT News', icon: 'fas fa-tv', route: '/admin-panel/wt-news' },
        { name: 'WT Video', icon: 'fas fa-tv', route: '/admin-panel/wt-video' },
        { name: 'Country', icon: 'fas fa-list-alt', route: '/admin-panel/country' },
    ]);

    const hamburger_button = useState('hamburger_button' , () => true);
</script>
<template>
    <!-- {{ current_slug }} <br> {{ current_path }} <br> -->
    <!-- <pre>{{ queue_service_list }}</pre> -->
    <div
        class="bg-[#D4E7DF] h-full py-2 overflow-auto transition-all duration-500 ease-in-out transform"
        :class="hamburger_button ? 'translate-x-0 w-[400px]' : '-translate-x-full w-0'"
    >
        <div v-if="hamburger_button" class="w-full flex justify-end pb-3 px-2">
            <button @click="hamburger_button = !hamburger_button"
                class="inline-flex  items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out">
                <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path :class="{
                        hidden: hamburger_button,
                        'inline-flex': !hamburger_button
                    }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16" />
                    <path :class="{
                        hidden: !hamburger_button,
                        'inline-flex': hamburger_button
                    }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div class="text-[#4D5155] text-base font-medium leading-[normal] mr-3"
            :class="current_path == item.route ? 'rounded-tl-none rounded-br-[40px] rounded-tr-[40px] rounded-bl-none bg-[#FFF]' : ''"
            v-for="(item, index) in queue_service_list" :key="index">
            <NuxtLink :to="item.route">
                <div class="flex items-center">
                    <span v-if="current_path == item.route" class="w-[6px] h-[40px] ml-2 border-[#0083C4] border-[3px] rounded-xl"></span>
                    <div class="p-4">
                        <i class="text-base pr-3" :class="[item.icon, current_path == item.route ? 'text-[#0083C4]' : 'text-[#4D5155] ']"></i>
                        <span class="text-[#4D5155] text-base">{{ item.name }}</span>
                    </div>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>