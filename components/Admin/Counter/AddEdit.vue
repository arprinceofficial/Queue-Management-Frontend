<script setup>
    import {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel,
        DialogTitle,
    } from '@headlessui/vue'

    const { 
        $api_admin_office_list,
        $api_admin_counter_create,
        $api_admin_counter_update,
    } = useNuxtApp();

    const props = defineProps({
        isOpen: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
        },
        data: {
            type: Object,
        },
    });
    

    const formData = ref({
        title: '',
        counter_number: '',
        office_id: '',
        status: 0,
    });
    
    const resetForm = () => {
        formData.value = {
            title: '',
            counter_number: '',
            office_id: '',
            status: 0,
        };
    }

    watch(() => props.data, (value) => {
        if (value) {
            formData.value = {
                title: value.title,
                counter_number: value.counter_number,
                office_id: value.office?.id,
                status: value.status,
            };
            isChecked.value = value.status == 1 ? true : false;
        }
    });
    
    const isChecked = ref(false)
    const handleCheckboxChange = () => {
        isChecked.value = !isChecked.value;
        formData.value.status = isChecked.value ? 1 : 0;
    }

    const admin_office_list = useState('admin_office_list', () => []);
    const loadOfficeList = async () => {
        try{
            const getData = await $fetchAdmin($api_admin_office_list, {
                method: 'POST',
                body: {
                    status: 1,
                },
            });
            admin_office_list.value = getData.data;
        } catch(e){
            console.log('Get Message',e.message);
        }
    }

    onMounted(() => {
        loadOfficeList();
    });

    const emit = defineEmits(['add_counter', 'cancel']);
    const is_loading = ref(false);
    const createCounter = async () => {
        // console.log('Create Counter', getData.data);
        // formData.value.id = getData.data.id;
        try{
            is_loading.value = true;
            const getData = await $fetchAdmin($api_admin_counter_create, {
                method: 'POST',
                body: formData.value,
            });
            if(getData.status == true){
                emit('add_counter', getData.data);
                // resetForm();
            }
        } catch(e){
            console.log('Get Message',e.message);
        } finally {
            is_loading.value = false;
        }
    }
    const updateCounter = async () => {
        // console.log('Update Counter', getData.data);
        try{
            is_loading.value = true;
            formData.value.id = props.data.id;
            const getData = await $fetchAdmin($api_admin_counter_update, {
                method: 'POST',
                body: formData.value,
            });
            if(getData.status == true){
                emit('add_counter', getData.data);
                // resetForm();
            }
        } catch(e){
            console.log('Get Message',e.message);
        } finally {
            is_loading.value = false;
        }
    }
</script>
<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" class="relative z-30">
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
                            class="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-lg text-center font-bold leading-6 text-gray-900">
                                {{ title }} Counter
                            </DialogTitle>
                            <div class="mt-2">
                                <!-- <pre>{{ data }}</pre> -->
                                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                    <div class="">
                                        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                                        <input type="text" name="title" id="title" v-model="formData.title"
                                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                    </div>
                                    <div class="">
                                        <label for="counter_number"
                                            class="block text-sm font-medium text-gray-700">Counter Number</label>
                                        <input type="text" name="counter_number" id="counter_number"
                                            v-model="formData.counter_number"
                                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                    </div>
                                    <div class="">
                                        <label for="office_id"
                                            class="block text-sm font-medium text-gray-700">Office</label>
                                        <select id="office_id" name="office_id" v-model="formData.office_id"
                                            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                            <option value="">Select Office</option>
                                            <option v-for="(item, index) in admin_office_list" :key="index"
                                                :value="item.id">{{ item.office_name }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="flex items-end">
                                        <div class="flex items-center gap-4">
                                            <label for="status"
                                                class="block text-sm font-medium text-gray-700">Status</label>
                                            <label class="flex cursor-pointer select-none items-center">
                                                <div class="relative">
                                                    <input type="checkbox" class="sr-only" @change="handleCheckboxChange" />
                                                    <div class="block h-8 w-14 rounded-full" :class="isChecked ? 'bg-green-200' : 'bg-gray-200'"></div>
                                                    <div :class="isChecked ? 'translate-x-full bg-green-600' : 'bg-white'"
                                                        class="dot absolute left-1 top-1 h-6 w-6 rounded-full transition">
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-4 flex justify-end">
                                <button type="button"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                    @click="$emit('cancel')">
                                    Cancel
                                </button>
                                <button type="button"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ml-3"
                                    @click="title == 'Add' ? createCounter() : updateCounter()">
                                    {{ title == 'Add' ? 'Create' : 'Update' }}
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