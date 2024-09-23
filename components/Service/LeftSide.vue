<script setup>
    const { $api_office_queue_services } = useNuxtApp();
    const route = useRoute();
	const current_slug = computed( () => route.params.slug );

    const queue_service_list = useState('queue_service_list', () => []);
    const load_services = async () => {
        if (queue_service_list.value.length > 0) return;
        // loader.value = true;
        try{
            const getData = await $fetchOffice($api_office_queue_services, {
                method: 'POST',
            });
            queue_service_list.value = getData.data;
        } catch(e){
            console.log('Get Message',e.message);
        } finally {
            // loader.value = false;
        }
    }

    onMounted(() => {
        load_services();
    });

    const hamburger_button = useState('hamburger_button');
</script>
<template>
    <!-- {{ current_slug }} -->
    <!-- <pre>{{ queue_service_list }}</pre> -->
    <div
        class="bg-[#D4E7DF] h-full py-2 overflow-auto transition-all duration-500 ease-in-out transform"
        :class="hamburger_button ? 'translate-x-0 w-[300px] lg:w-[400px]' : '-translate-x-full w-0'"
    >
        <div v-if="hamburger_button" class="w-full flex justify-end pb-3 px-2">
            <button @click="hamburger_button = !hamburger_button"
                class="inline-flex  items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out">
                <svg class="h-4 w-4 lg:h-6 lg:w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
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
        <div class="text-[#4D5155] text-[14px] lg:text-[22px] font-medium leading-[normal] mr-3"
            :class="current_slug == item.route ? 'rounded-tl-none rounded-br-[40px] rounded-tr-[40px] rounded-bl-none bg-[#FFF]' : ''"
            v-for="(item, index) in queue_service_list" :key="index">
            <NuxtLink :to="'/service/'+item.route" @click="hamburger_button = !hamburger_button">
                <div class="flex items-center">
                    <span v-if="current_slug == item.route" class="w-[3px] lg:w-[6px] h-[20px] lg:h-[40px] ml-2 border-[#0083C4] border-[3px] rounded-xl"></span>
                    <div class="p-2 lg:p-4">
                        <i class="text-[14px] lg:text-[22px] pr-2 lg:pr-3" :class="[item.icon, current_slug == item.route ? 'text-[#0083C4]' : 'text-[#4D5155] ']"></i>
                        <span class="text-[#4D5155] text-[14px] lg:text-[22px]">{{ item.name }}</span>
                    </div>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>