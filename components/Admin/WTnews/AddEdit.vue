<script setup>
    import {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel,
        DialogTitle,
    } from '@headlessui/vue'

    const {
        $api_admin_wt_news_create,
        $api_admin_wt_news_update,
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
        description: '',
        status: 0,
    });
    
    watch(() => props.data, (value) => {
        if (value) {
            validations_errors.value = {};
            formData.value = {
                title: value.title,
                description: value.description,
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

    const validations_errors = ref({});
    const skip_validations = ref([
        'description',
        'status',
    ]);
    const response_modal = ref({});
    const emit = defineEmits(['add_news', 'cancel']);
    const is_loading = ref(false);
    const createNews = async () => {
        validations_errors.value = {};
        const errors = Object.keys(formData.value).filter(item => !formData.value[item] && !skip_validations.value.includes(item));
        if(errors.length > 0){
            errors.map(item => {
                validations_errors.value[item] = `${item.replaceAll('_', ' ')} is required`;
            });
            console.log(validations_errors.value);
            return;
        }

        try{
            is_loading.value = true;
            const getData = await $fetchAdmin($api_admin_wt_news_create, {
                method: 'POST',
                body: formData.value,
            });
            response_modal.value = getData;
            if(getData.status == true){
                emit('add_news', getData.data);
            }
        } catch(e){
            console.log('Get Message',e.message);
            if(e.response?.status === 403 || e.response?.status === 409){
                for (const key in e.response._data.error) {
                    if (e.response._data.error.hasOwnProperty(key)) {
                        const value = e.response._data.error[key][0];
                        validations_errors.value[key] = value;
                    }
                }
            } else if (!e.response?.status){
                response_modal.value = {
                    status: false,
                    message: 'Something went wrong. Please try again later.',
                }
            } else {
                response_modal.value = {
                    status: e.response._data.status,
                    message: e.response._data.message,
                }
                
            }
        } finally {
            is_loading.value = false;
        }
    }
    const updateNews = async () => {
        validations_errors.value = {};
        const errors = Object.keys(formData.value).filter(item => !formData.value[item] && !skip_validations.value.includes(item));
        if(errors.length > 0){
            errors.map(item => {
                validations_errors.value[item] = `${item.replaceAll('_', ' ')} is required`;
            });
            console.log(validations_errors.value);
            return;
        }

        try{
            is_loading.value = true;
            formData.value.id = props.data.id;
            const getData = await $fetchAdmin($api_admin_wt_news_update, {
                method: 'POST',
                body: formData.value,
            });
            response_modal.value = getData;
            if(getData.status == true){
                emit('add_news', getData.data);
            }
        } catch(e){
            console.log('Get Message',e.message);
            if(e.response?.status === 403 || e.response?.status === 409){
                for (const key in e.response._data.error) {
                    if (e.response._data.error.hasOwnProperty(key)) {
                        const value = e.response._data.error[key][0];
                        validations_errors.value[key] = value;
                    }
                }
            } else if (!e.response?.status){
                response_modal.value = {
                    status: false,
                    message: 'Something went wrong. Please try again later.',
                }
            } else {
                response_modal.value = {
                    status: e.response._data.status,
                    message: e.response._data.message,
                }
                
            }
        } finally {
            is_loading.value = false;
        }
    }
</script>
<template>
    <div>
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
                                    {{ title }} News
                                </DialogTitle>
                                <div class="mt-2">
                                    <!-- <pre>{{ data }}</pre> -->
                                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                        <div class="">
                                            <label for="title"
                                                class="block text-sm font-medium text-gray-700">Title</label>
                                            <input type="text" name="title" id="title"
                                                v-model="formData.title"
                                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                            <InputError class="text-sm py-3 mb-2" :message="validations_errors.title" :text_size="'text-sm'" />
                                        </div>
                                        <div class="">
                                            <label for="description"
                                                class="block text-sm font-medium text-gray-700">Description</label>
                                            <input type="text" name="description" id="description"
                                                v-model="formData.description"
                                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                            <InputError class="text-sm py-3 mb-2" :message="validations_errors.description" :text_size="'text-sm'" />
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
                                        @click="title == 'Add' ? createNews() : updateNews()">
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
        <ResponseModal :response_modal="response_modal" />
    </div>
</template>