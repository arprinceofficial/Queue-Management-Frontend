<script setup>
    import {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel,
        DialogTitle,
    } from '@headlessui/vue'

    const {
        $api_admin_queue_service_create,
        $api_admin_queue_service_update,
        $api_admin_queue_service,
    } = useNuxtApp();

    const loadQueueList = async (id) => {
        try{
            const getData = await $fetchAdmin(`${$api_admin_queue_service}/${id}`, {
                method: 'GET',
            });
            if(getData.status == true){
                formData.value = getData.data;
                isChecked.value = getData.data.status == 1 ? true : false;
            }
        } catch(e){
            console.log('Get Message',e.message);
        }
    }

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
        name: '',
        color: '',
        slug: '',
        route: '',
        icon: '',
        status: 0,
        fields: [],
    });
    
    watch(() => props.data, (value) => {
        if (value) {
            if (value.id) {
                loadQueueList(value.id);
            }
            validations_errors.value = {};
            formData.value = {
                name: value.name,
                color: value.color,
                slug: value.slug,
                route: value.route,
                icon: value.icon,
                status: value.status,
                fields: value.fields,
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
        'status',
    ]);
    const response_modal = ref({});
    const emit = defineEmits(['add_QueueService', 'cancel']);
    const is_loading = ref(false);
    const createQueueService = async () => {
        validations_errors.value = {};
        // const errors = Object.keys(formData.value).filter(item => !formData.value[item] && !skip_validations.value.includes(item));
        // if(errors.length > 0){
        //     errors.map(item => {
        //         validations_errors.value[item] = `${item.replaceAll('_', ' ')} is required`;
        //     });
        //     console.log(validations_errors.value);
        //     return;
        // }

        try{
            is_loading.value = true;
            const getData = await $fetchAdmin($api_admin_queue_service_create, {
                method: 'POST',
                body: formData.value,
            });
            response_modal.value = getData;
            if(getData.status == true){
                emit('add_QueueService', getData.data);
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
    const updateQueueService = async () => {
        validations_errors.value = {};
        // const errors = Object.keys(formData.value).filter(item => !formData.value[item] && !skip_validations.value.includes(item));
        // if(errors.length > 0){
        //     errors.map(item => {
        //         validations_errors.value[item] = `${item.replaceAll('_', ' ')} is required`;
        //     });
        //     console.log(validations_errors.value);
        //     return;
        // }

        try{
            is_loading.value = true;
            formData.value.id = props.data.id;
            const getData = await $fetchAdmin($api_admin_queue_service_update, {
                method: 'POST',
                body: formData.value,
            });
            response_modal.value = getData;
            if(getData.status == true){
                emit('add_QueueService', getData.data);
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
    const addFeild = () => {
        formData.value.fields.push({
            selected_option: '',
            type: '',
            name: '',
            label: '',
            placeholder: '',
            required: false,
            options: [],
        });
    }

    const option_type = ref([
        { id: 1, value: 'text' },
        { id: 2, value: 'email' },
        { id: 3, value: 'number' },
        { id: 4, value: 'radio' },
    ]);

    const field_options = ref([
        { id: 1, value: 'Gender' },
        { id: 2, value: 'Priority' },
        { id: 3, value: 'Service' },
    ]);

    // const setOptions = (index) => {
    //     if (formData.value.fields[index].selected_option == 1) {
    //         formData.value.fields[index].field_options = admin_gender_list.value;
    //     } else if (formData.value.fields[index].selected_option == 2) {
    //         formData.value.fields[index].field_options = admin_priority_list.value;
    //     }
    // }
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
                                class="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <DialogTitle as="h3" class="text-lg text-center font-bold leading-6 text-gray-900">
                                    {{ title }} Queue Service
                                </DialogTitle>
                                <div class="mt-2">
                                    <!-- <pre>{{ data }}</pre> -->
                                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                        <div class="">
                                            <label for="name"
                                                class="block text-sm font-medium text-gray-700">Name</label>
                                            <input type="text" name="name" id="name"
                                                v-model="formData.name"
                                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                            <InputError class="text-sm py-3 mb-2" :message="validations_errors.name" :text_size="'text-sm'" />
                                        </div>
                                        <div class="">
                                            <label for="color"
                                                class="block text-sm font-medium text-gray-700">Color Code</label>
                                            <input type="text" name="color" id="color"
                                                v-model="formData.color"
                                                placeholder="0083C4"
                                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                            <InputError class="text-sm py-3 mb-2" :message="validations_errors.color" :text_size="'text-sm'" />
                                        </div>
                                        <div class="">
                                            <label for="slug"
                                                class="block text-sm font-medium text-gray-700">Slug</label>
                                            <input type="text" name="slug" id="slug"
                                                v-model="formData.slug"
                                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                            <InputError class="text-sm py-3 mb-2" :message="validations_errors.slug" :text_size="'text-sm'" />
                                        </div>
                                        <div class="">
                                            <label for="route"
                                                class="block text-sm font-medium text-gray-700">Route</label>
                                            <input type="text" name="route" id="route"
                                                v-model="formData.route"
                                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                            <InputError class="text-sm py-3 mb-2" :message="validations_errors.route" :text_size="'text-sm'" />
                                         </div>
                                        <div class="">
                                            <label for="icon"
                                                class="block text-sm font-medium text-gray-700">Icon</label>
                                            <input type="text" name="icon" id="icon"
                                                v-model="formData.icon"
                                                placeholder="fa-solid fa-messages-question"
                                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                            <InputError class="text-sm py-3 mb-2" :message="validations_errors.icon" :text_size="'text-sm'" />
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
                                <div class="flex flex-col items-center justify-center py-8">
                                    <h1 class="text-lg font-bold text-gray-900">Fields</h1>
                                    <InputError class="text-sm py-3 mb-2" :message="validations_errors.fields" :text_size="'text-sm'" />
                                </div>
                                <!-- {{ formData.fields }} -->
                                <template v-if="formData.fields?.length > 0">
                                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                        <div class="flex flex-col" v-for="(field, index) in formData.fields" :key="index">
                                            <div class="flex items-center justify-end">
                                                <button type="button"
                                                    class="inline-flex justify-center items-center h-[40px] w-[40px] rounded-[50%] border border-transparent bg-red-100 p-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 ml-3"
                                                    @click="formData.fields.splice(index, 1)">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </div>
                                            <div class="pb-5">
                                                <label for="type"
                                                    class="block text-sm font-medium text-gray-700">Type</label>
                                                <select name="type" id="type"
                                                    v-model="field.type"
                                                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                                    <option value="">Select Type</option>
                                                    <option v-for="option in option_type" :key="option.id" :value="option.value">{{ option.value }}</option>
                                                </select>
                                            </div>
                                            <!-- Field Options -->
                                             <!-- {{ field.selected_option }} -->
                                             <div class="pb-5" v-if="field.type == 'radio'">
                                                <label for="options"
                                                    class="block text-sm font-medium text-gray-700">Options</label>
                                                <!-- <select name="field_options" id="field_options"v-model="field.selected_option" @change="setOptions(index)" -->
                                                <select name="field_options" id="field_options"v-model="field.selected_option"
                                                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                                    <option value="">Select Options</option>
                                                    <option v-for="option in field_options" :key="option.id" :value="option.id">{{ option.value }}</option>
                                                </select>
                                             </div>
                                            <template v-if="field.type != ''">
                                                <div class="pb-5">
                                                    <label for="name"
                                                        class="block text-sm font-medium text-gray-700">Name</label>
                                                    <input type="text" name="name" id="name"
                                                        v-model="field.name"
                                                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                                </div>
                                                <div class="pb-5">
                                                    <label for="label"
                                                        class="block text-sm font-medium text-gray-700">Label</label>
                                                    <input type="text" name="label" id="label"
                                                        v-model="field.label"
                                                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                                </div>
                                                <div class="pb-5" v-if="field.type != 'radio'">
                                                    <label for="placeholder"
                                                        class="block text-sm font-medium text-gray-700">Placeholder</label>
                                                    <input type="text" name="placeholder" id="placeholder"
                                                        v-model="field.placeholder"
                                                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                                </div>
                                                <div class="flex items-end">
                                                    <div class="flex items-center gap-4">
                                                        <label for="required"
                                                            class="block text-sm font-medium text-gray-700">Required</label>
                                                        <label class="flex cursor-pointer select-none items-center">
                                                            <div class="relative">
                                                                <input type="checkbox" class="sr-only" v-model="field.required" />
                                                                <div class="block h-8 w-14 rounded-full" :class="field.required ? 'bg-green-200' : 'bg-gray-200'"></div>
                                                                <div :class="field.required ? 'translate-x-full bg-green-600' : 'bg-white'"
                                                                    class="dot absolute left-1 top-1 h-6 w-6 rounded-full transition">
                                                                </div>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                </template>
                                <div class="flex w-full justify-end">
                                    <div>
                                        <button type="button"
                                            class="inline-flex justify-center items-center h-[40px] w-[40px] rounded-[50%] border border-transparent bg-blue-100 p-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            @click="addFeild()">
                                            <i class="fas fa-plus"></i>
                                        </button>
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
                                        @click="title == 'Add' ? createQueueService() : updateQueueService()">
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