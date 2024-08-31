<script setup>
    useHead({ title: 'Agent Screen' });
    definePageMeta({ middleware: ['auth-agent'] });
    const { 
        $api_agent_queue_vouchers_get_reserve_queue,
        $api_agent_info,
    } = useNuxtApp();
    
    const get_reserve_queue = ref([]);
    const loadReserveQueue = async () => {
        try {
            const getData = await $fetchAgent($api_agent_queue_vouchers_get_reserve_queue, {
                method: 'POST',
            });
            get_reserve_queue.value = getData.data;
        } catch (e) {
            get_reserve_queue.value = [];
            console.log('Get Message', e.message);
        } 
    }
    const agent_user = ref({});
    const load_current_user = async () => {
        try {
            const getData = await $fetchAgent($api_agent_info, {
                method: 'GET',
            });
            agent_user.value = getData;
        } catch (e) {
            console.log('Get Message', e.message);
            agent_user.value = [];
        } 
    }
    onMounted(() => {
        load_current_user();
        loadReserveQueue();
    });

    // setInterval(() => {
    //     load_current_user();
    //     loadReserveQueue();
    // }, 5000);
    import { io } from 'socket.io-client';
    const api_base_url = useRuntimeConfig().public.API_BASE_URL;
    onMounted(() => {
        const socket = io(api_base_url);
        socket.on('reserveQueue', (data) => {
            loadReserveQueue();
        });
        socket.on('cancelQueue', (data) => {
            loadReserveQueue();
        });
        socket.on('completeQueue', (data) => {
            loadReserveQueue();
        });
        socket.on('transferQueue', (data) => {
            loadReserveQueue();
        });
        socket.on('logout', (data) => {
            agent_user.value = {};
        });
        socket.on('setCounter', (data) => {
            load_current_user();
        });
    });
</script>
<template>
    <!-- get_reserve_queue: <pre>{{ get_reserve_queue }}</pre> -->
    <div class="min-h-screen overflow-hidden">
        <div class="min-h-screen flex flex-col justify-between items-center">
            <div class="h-screen w-full flex flex-wrap flex items-center justify-center">
                <div class="md:w-1/3 w-full h-full" style="border-right: 1px solid #767676;">
                    <div class="h-full">
                        <div class="flex justify-center items-center" style="height: 200px;">
                            <ApplicationLogo :width="'150px'" :height="'100%'" />
                        </div>
                        <div style="height: calc(100vh - 200px); background: #0083C4;">
                            <div class="h-[100px] flex items-center justify-center" style="background: #005986;">
                                <h1 class="text-[20px] md:text-[40px] font-semibold" style="color: #FFD146;"> Counter No.</h1>
                            </div>
                            <div class="relative" style="height: calc(100vh - 300px); width: 100%;">
                                <div class="absolute left-0 flex items-center justify-between"
                                    style="height: 100%; width: 100%;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="347" viewBox="0 0 18 347"
                                        fill="none">
                                        <path d="M0.887451 0.700195L17.0125 11.4502V336.1L0.887451 346.85V0.700195Z"
                                            fill="#FCBD01" />
                                    </svg>
                                    <h1 v-if="agent_user?.data?.queue_counter?.counter_number" class="font-semibold" style="font-size: 300px; color: #fff;">{{ agent_user?.data?.queue_counter?.counter_number }}</h1>
                                    <h1 v-else class="font-semibold" style="font-size: 300px; color: #fff;">-</h1>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="348" viewBox="0 0 18 348"
                                        fill="none">
                                        <path d="M17.074 0.97168L0.952868 11.7191V336.291L17.074 347.038V0.97168Z"
                                            fill="#FCBD01" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="md:w-2/3 w-full h-full flex flex-col justify-between">
                    <div class="w-full flex flex-col justify-center items-center" style="height: 100%;">
                        <div v-if="get_reserve_queue.length == 0" class="flex items-center justify-center h-full">
                            <ApplicationLogo :width="'900px'" :height="'100%'" />
                        </div>
                        <div v-else class="flex flex-col items-center justify-center h-full">
                            <h1 class="font-semibold" style="font-size: 100px;">
                                Token No.
                            </h1>
                            <h1 class="font-semibold" style="font-size: 250px; color: #0083C4;">
                                {{ get_reserve_queue.token }}
                            </h1>
                        </div>
                    </div>
                    <div class="flex justify-center items-center" style="background: #0072AA; color: white;">
                        <h1 class="text-[20px] md:text-[25px] font-semibold p-5">
                            Welcome ! Please be seated you will be served soon
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>