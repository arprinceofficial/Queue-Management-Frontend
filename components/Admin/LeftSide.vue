<script setup>
    const { $api_office_queue_services } = useNuxtApp();
    const route = useRoute();
	const current_slug = computed( () => route.params.slug );
    const current_path = computed( () => route.path );

    const queue_service_list = ref([
        { name: 'Counter', icon: 'fas fa-list-ol', route: '/admin-panel/counter' },
        { name: 'Office', icon: 'fas fa-building', route: '/admin-panel/office' },
        { name: 'Priority', icon: 'fas fa-sort-amount-up-alt', route: '/admin-panel/priority' },
        { name: 'WT Screen', icon: 'fas fa-tv', route: '/admin-panel/wt-screen' },
        { name: 'Office User', icon: 'fas fa-user', route: '/admin-panel/user-office' },
        { name: 'Agent User', icon: 'fas fa-user', route: '/admin-panel/user-agent' },
        { name: 'Queue Service', icon: 'fas fa-list-alt', route: '/admin-panel/queue-service' },
    ]);
</script>
<template>
    <!-- {{ current_slug }} <br> {{ current_path }} <br> -->
    <!-- <pre>{{ queue_service_list }}</pre> -->
    <div class="bg-[#D4E7DF] h-full w-[400px] py-3 overflow-auto">
        <div class="text-[#4D5155] text-[22px] font-medium leading-[normal] mr-3"
            :class="current_path == item.route ? 'rounded-tl-none rounded-br-[40px] rounded-tr-[40px] rounded-bl-none bg-[#FFF]' : ''"
            v-for="(item, index) in queue_service_list" :key="index">
            <NuxtLink :to="item.route">
                <div class="flex items-center">
                    <span v-if="current_path == item.route" class="w-[6px] h-[40px] ml-2 border-[#0083C4] border-[3px] rounded-xl"></span>
                    <div class="p-4">
                        <i class="text-[22px] pr-3" :class="[item.icon, current_path == item.route ? 'text-[#0083C4]' : 'text-[#4D5155] ']"></i>
                        <span class="text-[#4D5155] text-[22px]">{{ item.name }}</span>
                    </div>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>