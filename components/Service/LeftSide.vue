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
</script>
<template>
    <!-- {{ current_slug }} -->
    <!-- <pre>{{ queue_service_list }}</pre> -->
    <div class="bg-[#D4E7DF] h-full w-[400px] py-3 overflow-auto">
        <div class="text-[#4D5155] text-[22px] font-medium leading-[normal] mr-3"
            :class="current_slug == item.route ? 'rounded-tl-none rounded-br-[40px] rounded-tr-[40px] rounded-bl-none bg-[#FFF]' : ''"
            v-for="(item, index) in queue_service_list" :key="index">
            <NuxtLink :to="item.route">
                <div class="flex items-center">
                    <span v-if="current_slug == item.route" class="w-[6px] h-[40px] ml-2 border-[#0083C4] border-[3px] rounded-xl"></span>
                    <div class="p-4">
                        <i class="text-[22px] pr-3" :class="[item.icon, current_slug == item.route ? 'text-[#0083C4]' : 'text-[#4D5155] ']"></i>
                        <span class="text-[#4D5155] text-[22px]">{{ item.name }}</span>
                    </div>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>