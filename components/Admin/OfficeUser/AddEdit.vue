<script setup>
    import {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel,
        DialogTitle,
    } from '@headlessui/vue'

    const {
        $api_admin_office_user_create,
        $api_admin_office_user_update,
        $api_admin_office_list,
        $api_admin_gender_list,
        $api_admin_country_list,
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
    
    const admin_office_list = useState('admin_office_list', () => []);
    const loadOfficeList = async () => {
        // if(admin_office_list.value.length > 0) return;
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

    const admin_gender_list = useState('admin_gender_list', () => []);
    const loadGenderList = async () => {
        try{
            const getData = await $fetchAdmin($api_admin_gender_list, {
                method: 'GET',
            });
            admin_gender_list.value = getData.data;
        } catch(e){
            console.log('Get Message',e.message);
        }
    }

    const admin_country_list = ref('admin_country_list');
    const loadCountryList = async () => {
        try{
            const getData = await $fetchAdmin($api_admin_country_list, {
                method: 'POST',
                body: { status: 1 },
            });
            admin_country_list.value = getData.data;
        } catch(e){
            console.log('Get Message',e.message);
        }
    }
    

    onMounted(() => {
        loadOfficeList();
        loadGenderList();
        loadCountryList();
    });

    const formData = ref({
        first_name: '',
        last_name: '',
        mobile_number: '',
        email: '',
        password: '',
        confirm_password: '',
        office_id: '',
        gender_id: '',
        country_id: '',
        profile_image: '',
        status: 0,
    });
    
    watch(() => props.data, (value) => {
        if (value) {
            validations_errors.value = {};
            formData.value = {
                first_name: value.first_name,
                last_name: value.last_name,
                mobile_number: value.mobile_number,
                email: value.email,
                password: '',
                office_id: value.office?.id,
                gender_id: value.gender?.id,
                country_id: value.country?.id,
                profile_image: value.profile_image,
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
        'status',
    ]);
    const response_modal = ref({});
    const emit = defineEmits(['add_OfficeUser', 'cancel']);
    const is_loading = ref(false);
    const createOfficeUser = async () => {
        validations_errors.value = {};
        const errors = Object.keys(formData.value).filter(item => !formData.value[item] && !skip_validations.value.includes(item));
        if(errors.length > 0){
            errors.map(item => {
                validations_errors.value[item] = `${item.replaceAll('_', ' ')} is required`;
            });
            console.log(validations_errors.value);
            return;
        }
        if(formData.value.password != formData.value.confirm_password){
            validations_errors.value['confirm_password'] = 'Password and Confirm Password does not match';
            return;
        }

        try{
            is_loading.value = true;
            const getData = await $fetchAdmin($api_admin_office_user_create, {
                method: 'POST',
                body: formData.value,
            });
            response_modal.value = getData;
            if(getData.status == true){
                emit('add_OfficeUser', getData.data);
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
                    // error: e.response._data.error,
                }
                
            }
        } finally {
            is_loading.value = false;
        }
    }
    const updateOfficeUser = async () => {
        validations_errors.value = {};
        const errors = Object.keys(formData.value).filter(item => !formData.value[item] && !skip_validations.value.includes(item));
        if(errors.length > 0){
            errors.map(item => {
                validations_errors.value[item] = `${item.replaceAll('_', ' ')} is required`;
            });
            console.log(validations_errors.value);
            return;
        }
        if(formData.value.password != formData.value.confirm_password){
            validations_errors.value['confirm_password'] = 'Password and Confirm Password does not match';
            return;
        }

        try{
            is_loading.value = true;
            formData.value.id = props.data.id;
            const getData = await $fetchAdmin($api_admin_office_user_update, {
                method: 'POST',
                body: formData.value,
            });
            response_modal.value = getData;
            if(getData.status == true){
                emit('add_OfficeUser', getData.data);
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
                    // error: e.response._data.error,
                }
                
            }
        } finally {
            is_loading.value = false;
        }
    }

    // check password
    watch(() => formData.value.password, (value) => {
        if(value?.length > 0){
            if(value.length < 8){
                validations_errors.value.password = 'Password must be at least 8 characters.';
            } else {
                validations_errors.value.password = '';
            }
        } else {
            validations_errors.value.password = '';
        }
    });
    // check confirm password
    watch(() => formData.value.confirm_password, (value) => {
        if(value?.length > 0){
            if(value != formData.value.password){
                validations_errors.value.confirm_password = 'Password and Confirm Password must be same.';
            } else {
                validations_errors.value.confirm_password = '';
            }
        } else {
            validations_errors.value.confirm_password = '';
        }
    });
    // Match password and confirm password
    watch(() => formData.value.confirm_password, (value) => {
        if(value?.length > 0){
            if(value != formData.value.password){
                validations_errors.value.confirm_password = 'Password and Confirm Password must be same.';
            } else {
                validations_errors.value.confirm_password = '';
            }
        } else {
            validations_errors.value.confirm_password = '';
        }
    });

    const setPhoto = (photo) => {
        formData.value.profile_image = photo;
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
                                    {{ title }} Office User
                                </DialogTitle>
                                <div class="mt-2">
                                    <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                        <div>
                                            <PhotoBlockPhoto :getPhoto="formData.profile_image" @set_photo="setPhoto" />
                                            <InputError class="text-sm py-3 mb-2" :message="validations_errors.profile_image" :text_size="'text-sm'" />
                                        </div>
                                    </div>
                                    <!-- <pre>{{ data }}</pre> -->
                                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                        <div class="">
                                            <label for="first_name"
                                                class="block text-sm font-medium text-gray-700">First Name</label>
                                            <input type="text" name="first_name" id="first_name"
                                                v-model="formData.first_name"
                                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                            <InputError class="text-sm py-3 mb-2" :message="validations_errors.first_name" :text_size="'text-sm'" />
                                        </div>
                                        <div class="">
                                            <label for="last_name"
                                                class="block text-sm font-medium text-gray-700">Last Name</label>
                                            <input type="text" name="last_name" id="last_name"
                                                v-model="formData.last_name"
                                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                            <InputError class="text-sm py-3 mb-2" :message="validations_errors.last_name" :text_size="'text-sm'" />
                                        </div>
                                        <div class="">
                                            <label for="mobile_number"
                                                class="block text-sm font-medium text-gray-700">Mobile Number</label>
                                            <input type="text" name="mobile_number" id="mobile_number"
                                                v-model="formData.mobile_number"
                                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                            <InputError class="text-sm py-3 mb-2" :message="validations_errors.mobile_number" :text_size="'text-sm'" />
                                        </div>
                                        <div class="">
                                            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                                            <input type="email" name="email" id="email" v-model="formData.email"
                                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                            <InputError class="text-sm py-3 mb-2" :message="validations_errors.email" :text_size="'text-sm'" />
                                        </div>
                                        <div class="">
                                            <label for="password"
                                                class="block text-sm font-medium text-gray-700">Password</label>
                                            <input type="password" name="password" id="password"
                                                v-model="formData.password"
                                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                            <InputError class="text-sm py-3 mb-2" :message="validations_errors.password" :text_size="'text-sm'" />
                                        </div>
                                        <div class="">
                                            <label for="confirm_password"
                                                class="block text-sm font-medium text-gray-700">Confirm Password</label>
                                            <input type="password" name="confirm_password" id="confirm_password"
                                                v-model="formData.confirm_password"
                                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                            <InputError class="text-sm py-3 mb-2" :message="validations_errors.confirm_password" :text_size="'text-sm'" />
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
                                            <InputError class="text-sm mt-2" :message="validations_errors.office_id" :text_size="'text-sm'" />
                                        </div>
                                        <div class="">
                                            <label for="gender_id"
                                                class="block text-sm font-medium text-gray-700">Gender</label>
                                            <select id="gender_id" name="gender_id" v-model="formData.gender_id"
                                                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                                <option value="">Select Gender</option>
                                                <option v-for="(item, index) in admin_gender_list" :key="index"
                                                    :value="item.id">{{ item.name }}
                                                </option>
                                            </select>
                                            <InputError class="text-sm mt-2" :message="validations_errors.gender_id" :text_size="'text-sm'" />
                                        </div>
                                        <div class="">
                                            <label for="country_id"
                                                class="block text-sm font-medium text-gray-700">Country</label>
                                            <select id="country_id" name="country_id" v-model="formData.country_id"
                                                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                                <option value="">Select Country</option>
                                                <option v-for="(item, index) in admin_country_list" :key="index"
                                                    :value="item.id">{{ item.country_name }}
                                                </option>
                                            </select>
                                            <InputError class="text-sm mt-2" :message="validations_errors.country_id" :text_size="'text-sm'" />
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
                                        @click="title == 'Add' ? createOfficeUser() : updateOfficeUser()">
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