<script setup>
    const { 
        $api_agent_queue_counters_get_online_counter,
        $api_agent_queue_vouchers_tranfer_queue,
    } = useNuxtApp();
    import {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel,
        DialogTitle,
    } from '@headlessui/vue'

    const props = defineProps({
        isOpen: {
            type: Boolean,
            required: true
        }
    });
    const emit = defineEmits(['update_modal']);

    const closeModal = () => {
        emit('update_modal', false);
    }

    const get_token_id = useState('get_token_id');
    const online_counter_list = useState('online_counter_list', () => []);
    const loader = ref(false);
    const loadTransferList = async () => {
        if (online_counter_list.value.length > 0) return;
        loader.value = true;
        try {
            const getData = await $fetchAgent($api_agent_queue_counters_get_online_counter, {
                method: 'POST',
            });
            online_counter_list.value = getData.data;
        } catch (e) {
            console.log('Get Message', e.message);
        } finally {
            loader.value = false;
        }
    }
    onMounted(() => {
        loadTransferList();
    });

    const is_loading = ref(false);
    const transferQueue = async (item) => {
        is_loading.value = true;
        try {
            const getData = await $fetchAgent($api_agent_queue_vouchers_tranfer_queue, {
                method: 'POST',
                body: {
                    id: get_token_id.value,
                    counter_id: item.id
                }
            });
            if(getData.status == true){
                get_token_id.value = '';
                // online_counter_list.value = [];
                closeModal();
            }
        } catch (e) {
            console.log('Get Message', e.message);
        } finally {
            is_loading.value = false;
        }
    }
</script>
<template>
    <!-- {{ get_token_id }} -->
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-md transform rounded-2xl bg-[#FBF7F1] p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-[20px] md:text-[25px] font-semibold">
                                Transfer Counter
                            </DialogTitle>
                            <div class="px-3 pt-4 max-h-[calc(100vh-250px)] overflow-auto">
                                <LoaderSpinkitBounceLoader v-if="loader" class="w-full"/>
                                <template v-else>
                                    <!-- {{ get_token_id }} -->
                                    <!-- <pre>{{ online_counter_list }}</pre> -->
                                    <div v-for="(item, index) in online_counter_list" :key="index" @click="transferQueue(item)"
                                        class="p-3 rounded-[3px] bg-[#FFF] mb-3 flex items-center justify-between cursor-pointer hover:bg-[#EC9C0E] hover:text-white">
                                        <div class="flex">
                                            <div class="flex">
                                                <p class="pr-2 text-[13px] md:text-[15px] font-semibold">Counter No : {{ item.counter_number }},</p>
                                                <div class="flex gap-3 text-[13px] md:text-[15px] font-semibold">
                                                    <p>{{ item.title }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>

                            <div class="mt-4 flex justify-end">
                                <button type="button"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    @click="closeModal">
                                    Cancel
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
            <LoaderModalSpin :isOpen="is_loading" />
        </Dialog>
    </TransitionRoot>
</template>