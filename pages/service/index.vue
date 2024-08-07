<script setup>
	useHead({ title: 'Service' });
	definePageMeta({ middleware: ['auth-office'], layout: 'office' });
    const { $api_office_queue_services } = useNuxtApp();
    
    const queue_service_list = useState('queue_service_list', () => []);
    const loader = ref(false);
    const load_services = async () => {
        if (queue_service_list.value.length > 0) return;
        loader.value = true;
        try{
            const getData = await $fetchOffice($api_office_queue_services, {
                method: 'POST',
            });
            queue_service_list.value = getData.data;
        } catch(e){
            console.log('Get Message',e.message);
        } finally {
            loader.value = false;
        }
    }

    onMounted(() => {
        load_services();
    });
</script>

<template>
    <!-- <pre>{{ queue_service_list }}</pre> -->
    <div class="my-8 w-full flex justify-center">
        <div class="w-[90%] h-[100px] bg-[linear-gradient(90deg,_#FFF_0%,_#EDEDED_53%,_#FFF_100%)] flex items-center justify-center">
            <h1 class="text-[54px] font-semibold text-gray-900 ">Select Service</h1>
        </div>
    </div>
    <div class="overflow-auto h-[calc(100vh-240px)]">
        <LoaderSpinkitBounceLoader v-if="loader"/>
        <template v-else>
            <div v-for="(item, index) in queue_service_list" :key="index" class="mt-16 flex justify-center">
                <NuxtLink :to="'service/'+item.route">
                    <div class="w-[500px] h-[288px] rounded-[20px] flex flex-col items-center justify-center" :style="{ backgroundColor:`#${item.color}` }">
                        <i class="text-[#FFF] text-[54px]" :class="item.icon"></i>
                        <h1 class="text-white text-[54px] font-semibold">{{ item.name }}</h1>
                    </div>
                </NuxtLink>
            </div>
        </template>
    </div>
</template>