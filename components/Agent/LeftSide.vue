<script setup>
    const { 
        $api_agent_queue_vouchers_get_reserve_queue,
        $api_agent_queue_vouchers_complete_queue,
        $api_agent_queue_vouchers_reject_queue,
    } = useNuxtApp();

    const get_reserve_queue = useState('get_reserve_queue', () => []);
    const loader = ref(false);
    const loadReserveQueue = async () => {
        if (get_reserve_queue.value.length > 0) return;
        loader.value = true;
        try {
            const getData = await $fetchAgent($api_agent_queue_vouchers_get_reserve_queue, {
                method: 'POST',
            });
            get_reserve_queue.value = getData.data;
            get_token_id.value = getData.data.id;
        } catch (e) {
            console.log('Get Message', e.message);
        } finally {
            loader.value = false;
        }
    }
    onMounted(() => {
        loadReserveQueue();
    });

    const get_token_id = useState('get_token_id');
    watch(get_token_id, (newValue) => {
        console.log('New Value', newValue);
        get_reserve_queue.value = [];
        loadReserveQueue();
        stopTimer();
    });
    
    const is_loading = ref(false);
    const completeTask = async () => {
        try {
            is_loading.value = true;
            const getData = await $fetchAgent($api_agent_queue_vouchers_complete_queue, {
                method: 'POST',
                body: {
                    id: get_reserve_queue.value.id,
                    duration: displayTime.value,
                    remarks: ''
                }
            });
            if (getData.status == true) {
                get_reserve_queue.value = [];
                get_token_id.value = '';
                stopTimer();
                // loadReserveQueue();
            }
        } catch (e) {
            console.log('Get Message', e.message);
        } finally {
            is_loading.value = false;
        }
    }

    // Timer Function
    const serving_time = ref(0);
    const displayTime = ref('00:00:00');
    const intervalId = ref(null);
    const is_start_task = ref(false);

    const updateDisplayTime = () => {
        const hours = Math.floor(serving_time.value / 3600);
        const minutes = Math.floor((serving_time.value % 3600) / 60);
        const seconds = serving_time.value % 60;
        displayTime.value = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const startTimer = () => {
        intervalId.value = setInterval(() => {
            serving_time.value++;
            updateDisplayTime();
        }, 1000);
    };

    const stopTimer = () => {
        if (intervalId.value) {
            clearInterval(intervalId.value);
            intervalId.value = null;
        }
        serving_time.value = 0;
        displayTime.value = '00:00:00';
        is_start_task.value = false;
    };

    const startTask = () => {
        if (!is_start_task.value) {
            is_start_task.value = true;
            startTimer();
        }
    };

    const agent_user = useState('agent_user');
    import { useSpeechSynthesis } from '@vueuse/core'
    const voice = ref(null)
    const text = ref('')
    const pitch = ref(10)
    const rate = ref(1)
    const speech = useSpeechSynthesis(text, {
        voice,
        pitch,
        rate,
    })
    let synth
    const voices = ref([])
    onMounted(() => {
        if (speech.isSupported.value) {
            setTimeout(() => {
                synth = window.speechSynthesis
                voices.value = synth.getVoices()
                voice.value = voices.value[2]
            }, 0)
        }
    })
    const play= () =>{
        if (speech.status.value === 'pause') {
            console.log('resume')
            window.speechSynthesis.resume()
        } else {
            speech.speak()
        }
    }
    const playText = () => {
        let token = get_reserve_queue.value.token;

        // Add a space after every digit
        token = token.replace(/(\d|-)/g, ' $1 - - - ');

        // Trim any trailing space
        token = token.trim();
        
        let counter = agent_user.value.data.queue_counter.counter_number;
        text.value = 'Calling Token Number ' + token + ' Counter ' + counter;
        play()
    }

    const is_load_reg = ref(false);
    const registration = () => {
        is_load_reg.value = true;
    }
    const citizenData = (data) => {
        console.log('data', data);
        is_load_reg.value = false;
    }

    const rejectTask = async () => {
        try {
            is_loading.value = true;
            const getData = await $fetchAgent($api_agent_queue_vouchers_reject_queue, {
                method: 'POST',
                body: {
                    id: get_reserve_queue.value.id,
                }
            });
            if (getData.status == true) {
                get_reserve_queue.value = [];
                get_token_id.value = '';
                stopTimer();
            }
        } catch (e) {
            console.log('Get Message', e.message);
        } finally {
            is_loading.value = false;
        }
    }
</script>
<template>
    <div class="md:w-1/2 w-full h-full flex justify-center bg-[#DFEFE8]">
        <LoaderSpinkitBounceLoader v-if="loader" class="w-full"/>
        <div v-else class="p-2 w-full flex flex-col items-center justify-between">
            <template v-if="get_reserve_queue.length == 0">
                <div class="flex items-center justify-center h-full">
                    <p class="text-[20px] md:text-[25px] font-semibold">
                        No Token Reserved
                    </p>
                </div>
            </template>
            <template v-else>
                <!-- <pre>{{ get_reserve_queue.citizen_info }}</pre> -->
                <!-- {{ get_token_id }} -->
                <!-- {{ get_reserve_queue.id }} -->
                <!-- {{ text }} -->
                <div class="flex flex-col items-center overflow-auto w-full">
                    <p class="text-[18px] sm:text-[20px] md:text-[30px] text-[#00B076] text-center font-semibold pt-3">Currently Serving</p>

                    <template v-if="!is_start_task">
                        <div>
                            <h1 class="text-[28px] sm:text-[35px] md:text-[45px] text-black font-semibold">Token Number</h1>
                            <div class="w-[130px] sm:w-[230px] md:w-[350px] h-[70px] sm:h-[100px] md:h-[150px] rounded-[20px] border-[2px] md:border-[4px] border-[solid] border-[#0083C4] bg-[#FFF] flex items-center justify-center mt-3">
                                <h1 class="text-[30px] sm:text-[60px] md:text-[80px] text-[#0083C4] text-center not-italic font-semibold leading-[normal]">
                                    {{ get_reserve_queue.token }}
                                </h1>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="flex flex-col items-center justify-center py-3 gap-3">
                            <h1 class="text-[28px] sm:text-[35px] md:text-[45px] text-[#0083C4] font-semibold">{{ get_reserve_queue.customer_name }}</h1>
                            <div>
                                <p class="text-[13px] sm:text-[15px] md:text-[20px] font-semibold">Mobile: {{ get_reserve_queue.mobile }}</p>
                                <p class="text-[13px] sm:text-[15px] md:text-[20px] font-semibold">Email: {{ get_reserve_queue.email }}</p>
                                <p class="text-[13px] sm:text-[15px] md:text-[20px] font-semibold">Sex: N/A</p>
                                <p class="text-[13px] sm:text-[15px] md:text-[20px] font-semibold">Select Piority Lane: N/A</p>
                                <p class="text-[13px] sm:text-[15px] md:text-[20px] font-semibold">Services: {{ get_reserve_queue.service.title }}</p>
                            </div>
                        </div>
                    </template>
                                        

                    <div class="flex flex-col items-center mt-3">
                        <p class="text-[14px] sm:text-[15px] md:text-[20px] font-semibold">Serving Time</p>
                        <p class="text-[25px] sm:text-[30px] md:text-[40px] font-semibold min-w-[200px] flex justify-center">{{ displayTime }}</p>
                    </div>
                </div>
    
                <div class="py-3 w-full">
                    <div class="w-full flex justify-center items-center">
                        <div
                            class="w-[90%] md:h-[100px] lg:h-[120px] bg-[#FFF] [box-shadow:0px_4.3px_10.75px_0px_rgba(0,_0,_0,_0.05)] rounded-lg p-2 bg-[#F9F9F9]">
                            <div class="h-full flex flex-wrap flex items-center justify-center">
                                <div class="w-full h-full flex justify-center">
                                    <div class="m-2 w-full flex items-center justify-center">
                                        <div class="flex md:flex-nowrap flex-wrap w-full h-full gap-2">
                                            <ButtonSecondary 
                                                :name="'Start'"
                                                :border="true" 
                                                @click="get_reserve_queue.length > 0 || !is_start_task ? startTask() : ''" 
                                                :disabled="get_reserve_queue.length == 0 || is_start_task" 
                                            />
                                            <ButtonSecondary 
                                                :name="'Call'"
                                                class="md:mt-0 mt-4"
                                                @click="playText"
                                            />
                                            <ButtonSecondary v-if="!get_reserve_queue?.citizen_info && is_start_task"
                                                :name="'Complete'" 
                                                class="md:mt-0 mt-4"
                                                @click="get_reserve_queue.length > 0 || is_start_task ? completeTask() : ''" 
                                                :disabled="get_reserve_queue.length == 0 || !is_start_task" 
                                            />
                                            <ButtonSecondary v-if="get_reserve_queue?.citizen_info && is_start_task"
                                                :name="'Registration'" 
                                                class="md:mt-0 mt-4"
                                                @click="get_reserve_queue.length > 0 || is_start_task ? registration() : ''" 
                                                :disabled="get_reserve_queue.length == 0 || !is_start_task" 
                                            />
                                            <ButtonSecondary v-if="!is_start_task"
                                                :name="'Reject'" 
                                                class="md:mt-0 mt-4 bg-[#FF0000] hover:bg-[#FF0000]"
                                                @click="!is_start_task ? rejectTask() : ''" 
                                                :disabled="is_start_task" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <LoaderModalSpin :isOpen="is_loading" />
        <OfficeRegistration :isOpen="is_load_reg" @citizen_data="citizenData" />
    </div>
</template>