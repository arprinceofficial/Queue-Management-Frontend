<script setup>
    const { 
        $api_agent_queue_vouchers_get_waitinglist,
        $api_agent_queue_vouchers_reserve_queue
    } = useNuxtApp();
    // const agent_waiting_list = ref([
    //     {
    //         token_no: 'A-013',
    //         service_name: 'Inquiry',
    //         token_generated: '28 Nov, 2023'
    //     },
    //     {
    //         token_no: 'A-014',
    //         service_name: 'Avail Service',
    //         token_generated: '28 Nov, 2023'
    //     },
    //     {
    //         token_no: 'A-015',
    //         service_name: 'Complaint',
    //         token_generated: '28 Nov, 2023'
    //     }
    // ]);
    
    const agent_waiting_list = useState('agent_waiting_list', () => []);
    const loader = ref(false);
    const loadWaitingList = async () => {
        if (agent_waiting_list.value.length > 0) return;
        loader.value = true;
        try {
            const getData = await $fetchAgent($api_agent_queue_vouchers_get_waitinglist, {
                method: 'POST',
            });
            agent_waiting_list.value = getData.data;
        } catch (e) {
            console.log('Get Message', e.message);
        } finally {
            loader.value = false;
        }
    }
    onMounted(() => {
        loadWaitingList();
    });

    const refreshWaitingList = async () =>{
        try {
            const getData = await $fetchAgent($api_agent_queue_vouchers_get_waitinglist, {
                method: 'POST',
            });
            agent_waiting_list.value = getData.data;
        } catch (e) {
            console.log('Get Message', e.message);
        }
    }
    // setInterval(() => {
    //     refreshWaitingList();
    // }, 5000);
    import { io } from 'socket.io-client';
    const api_base_url = useRuntimeConfig().public.API_BASE_URL;
    // const socket_data = ref('');
    onMounted(() => {
        const socket = io(api_base_url);
        socket.on('createQueueToken', (data) => {
            // socket_data.value = data;
            refreshWaitingList();
        });
        socket.on('transferQueue', (data) => {
            refreshWaitingList();
        });
    });
    
    const is_loading = ref(false);
    
    const get_reserve_queue = useState('get_reserve_queue');
    const get_token_id = useState('get_token_id', '');
    const callNext = async () => {
        // console.log(agent_waiting_list.value[0].token);
        // get_token_id.value = agent_waiting_list.value[0].token;
        // agent_waiting_list.value.shift();

        try {
            is_loading.value = true;
            const getData = await $fetchAgent($api_agent_queue_vouchers_reserve_queue, {
                method: 'POST',
                body: {
                    id: agent_waiting_list.value[0].id
                }
            });
            if (getData.status == true) {
                get_token_id.value = agent_waiting_list.value[0].id;
                agent_waiting_list.value.shift();
            }
        } catch (e) {
            console.log('Get Message', e.message);
        } finally {
            is_loading.value = false;
        }
    }

    const is_modal_load = ref(false);
    const updateModal = (value) => {
        is_modal_load.value = value;
    }
</script>
<template>
    <!-- R: {{ get_token_id }} <br> -->
    <!-- R: {{ agent_waiting_list[0].id }} -->
    <!-- <pre>{{ agent_waiting_list[0]?.id }}</pre> -->
    <div class="md:w-1/2 w-full h-full overflow-auto flex justify-center ">
        <div class="pt-2 md:p-2 md:py-0 w-full flex flex-col items-center justify-between">
            <div class="w-full px-5 py-[12px] bg-[#F2E5C5]">
                <p class="text-[20px] md:text-[25px] font-semibold">
                    Waiting 
                    <!-- <pre>{{ socket_data }}</pre> -->
                    <!-- {{ get_token_id }}  -->
                    <!-- <pre>{{ get_reserve_queue.token }}</pre> -->
                </p>
            </div>
            <div class="h-full w-full p-3 overflow-auto bg-[#FBF7F1] sm:max-h-[calc(100vh-95px)] md:max-h-[calc(100vh-95px)]">
                <LoaderSpinkitBounceLoader v-if="loader" class="w-full"/>
                <AgentWaitingList :data="agent_waiting_list" />
            </div>

            <div class="pt-3 w-full">
                <div
                    class="w-full flex justify-center items-center bg-[#BBEAD6] [box-shadow:0px_4.3px_10.75px_0px_rgba(0,_0,_0,_0.05)] rounded-lg">
                    <div class="w-[90%] md:h-[100px] lg:h-[120px] p-2">
                        <div class="h-full flex flex-wrap flex items-center justify-center">
                            <div class="md:w-1/2 w-full h-full flex justify-center md:pr-4 pr-0">
                                <ButtonSecondary 
                                    :name="'Next'" 
                                    :border="true" 
                                    @click="agent_waiting_list.length > 0 && !get_reserve_queue.token ? callNext() : ''" 
                                    :disabled="agent_waiting_list.length == 0 || get_reserve_queue.token" 
                                />
                            </div>
                            <div class="md:w-1/2 w-full h-full flex justify-center md:pt-0 pt-4">
                                <ButtonSecondary 
                                    :name="'Transfer'" 
                                    @click="get_reserve_queue.token ? is_modal_load = true : ''"
                                    :disabled="!get_reserve_queue.token"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <LoaderModalSpin :isOpen="is_loading" />
        <AgentTransferCounter :isOpen="is_modal_load" @update_modal="updateModal"/>
    </div>
</template>