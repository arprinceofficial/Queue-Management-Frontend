<script setup>
    const { 
        $api_agent_queue_counters_get_counter, 
        $api_agent_queue_counters_set_counter,
        $api_agent_queue_counters_revoke_counter,
    } = useNuxtApp();
    const agent_user = useState('agent_user')
    // let data = {
    //     "id": 1,
    //     "title": "Piagapo Counter One",
    //     "slug": "piagapo-counter-1",
    //     "counter_number": "1",
    //     "priority_lane": 1,
    //     "priority_leans": "[\"2\", \"1\"]",
    //     "queue_office_id": 1,
    //     "agent_id": 2
    // };
    // const setCounter = () => {
    //     agent_user.value.data.queue_counter = data;
    // }

    const agent_counter_list = useState('agent_counter_list', () => []);
    const loader = ref(false);
    const loadCounterList = async () => {
        if (agent_counter_list.value.length > 0) return;
        loader.value = true;
        try {
            const getData = await $fetchAgent($api_agent_queue_counters_get_counter, {
                method: 'POST',
            });
            agent_counter_list.value = getData;
        } catch (e) {
            console.log('Get Message', e.message);
        } finally {
            loader.value = false;
        }
    }
    
    const is_loading = ref(false);
    const setCounter = async (item) => {
        is_loading.value = true;
        try {
            const getData = await $fetchAgent($api_agent_queue_counters_set_counter, {
                method: 'POST',
                body: {
                    counter_id: item.id
                }
            });
            if(getData.status == true){
                agent_user.value.data.queue_counter = getData.data;
            }
        } catch (e) {
            console.log('Get Message', e.message);
        } finally {
            is_loading.value = false;
        }
    }

    const revokeCounter = async (item) => {
        is_loading.value = true;
        try {
            const getData = await $fetchAgent($api_agent_queue_counters_revoke_counter, {
                method: 'POST',
                body: {
                    counter_id: item.id
                }
            });
            if(getData.status == true){
                loadCounterList();
            }
        } catch (e) {
            console.log('Get Message', e.message);
        } finally {
            is_loading.value = false;
        }
    }

    onMounted(() => {
        loadCounterList();
    });
</script>
<template>
    <!-- <pre>{{ agent_counter_list }}</pre> -->
    <!-- <pre>{{ agent_user.data }}</pre> -->
    <!-- <button @click="setCounter" class="bg-[#EC9C0E] text-white px-3 py-1 rounded-[5px]">
        update current user
    </button> -->
    <div class="h-full md:h-[calc(100vh-95px)] w-full px-3 flex flex-wrap flex items-center justify-center">
        <div class="md:w-1/2 w-full h-full overflow-auto flex justify-center ">
            <div class="pt-2 md:p-2 md:py-0 w-full flex flex-col items-center justify-between">
                <div class="w-full px-5 py-[12px] bg-[#F2E5C5]">
                    <h1 class="text-[20px] md:text-[25px] font-semibold">
                        Select Counter
                    </h1>
                </div>
                <div class="h-full w-full p-3 overflow-auto bg-[#FBF7F1] sm:max-h-[calc(100vh-95px)] md:max-h-[calc(100vh-95px)]">
                    <LoaderSpinkitBounceLoader v-if="loader" class="w-full"/>
                    <template v-else>
                        <div v-for="(item, index) in agent_counter_list.availabledata" :key="index" @click="setCounter(item)"
                            class="p-3 rounded-[3px] bg-[#FFF] border-[5px] border-y-0 border-[solid] border-[#EC9C0E] mb-3 flex items-center justify-between cursor-pointer">
                            <div class="flex">
                                <p class="pr-2 text-[13px] md:text-[15px] font-semibold">Counter No : {{ item.counter_number }},
                                </p>
                                <div class="flex gap-3 text-[13px] md:text-[15px] font-semibold">
                                    <p>{{ item.title }}</p>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>

        <div class="md:w-1/2 w-full h-full overflow-auto flex justify-center ">
            <div class="pt-2 md:p-2 md:py-0 w-full flex flex-col items-center justify-between">
                <div class="w-full px-5 py-[12px] bg-[#F2E5C5]">
                    <h1 class="text-[20px] md:text-[25px] font-semibold text-red-500">
                        Revoke Counter
                    </h1>
                </div>
                <div class="h-full w-full p-3 overflow-auto bg-[#FBF7F1] sm:max-h-[calc(100vh-95px)] md:max-h-[calc(100vh-95px)]">
                    <LoaderSpinkitBounceLoader v-if="loader" class="w-full"/>
                    <template v-else>
                        <div v-for="(item, index) in agent_counter_list.bookeddata" :key="index" @click="revokeCounter(item)"
                            class="p-3 rounded-[3px] bg-[#FFF] border-[5px] border-y-0 border-[solid] border-[#EC9C0E] mb-3 flex items-center justify-between cursor-pointer">
                            <div class="flex">
                                <p class="pr-2 text-[13px] md:text-[15px] font-semibold">Counter No : {{ item.counter_number }},
                                </p>
                                <div class="flex gap-3 text-[13px] md:text-[15px] font-semibold">
                                    <p>{{ item.title }}</p>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <LoaderModalSpin :isOpen="is_loading" />
    </div>
</template>