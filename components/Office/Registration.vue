<script setup>
    import {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel,
        DialogTitle,
    } from '@headlessui/vue'
    import PhotoBlock from './Photo';
    const props = defineProps({
        isOpen: {
            type: Boolean,
            required: true
        }
    });

    const gender = ref([
        {
            "id": 1,
            "gender_name": "Male",
            "status": 1
        },
        {
            "id": 2,
            "gender_name": "Female",
            "status": 1
        }
    ]);

    const religions = ref([
        {
            "id": 1,
            "name": "Islam",
            "status": 1
        },
        {
            "id": 2,
            "name": "Christianity",
            "status": 1
        },
        {
            "id": 3,
            "name": "Hinduism",
            "status": 1
        },
        {
            "id": 4,
            "name": "Buddhism",
            "status": 1
        },
        {
            "id": 5,
            "name": "Judaism",
            "status": 1
        },
        {
            "id": 6,
            "name": "Jainism",
            "status": 1
        },
        {
            "id": 7,
            "name": "Sikhism",
            "status": 1
        },
        {
            "id": 8,
            "name": "Zoroastrianism",
            "status": 1
        },
        {
            "id": 9,
            "name": "Humanism",
            "status": 1
        },
        {
            "id": 10,
            "name": "Baha'i",
            "status": 1
        },
        {
            "id": 11,
            "name": "Agnosticism",
            "status": 1
        },
        {
            "id": 12,
            "name": "Atheism",
            "status": 1
        }
    ]);

    const marital_status = ref([
        {
            "id": 1,
            "name": "Married",
            "status": 1
        },
        {
            "id": 2,
            "name": "Single",
            "status": 1
        },
        {
            "id": 3,
            "name": "Divorced",
            "status": 1
        },
        {
            "id": 4,
            "name": "Widowed/Widower",
            "status": 1
        }
    ]);

    const govt_issue_list = ref([
    {
            "id": 1,
            "name": "Philippine Passport from Department of Foreign Affairs",
            "status": 1
        },
        {
            "id": 2,
            "name": "SSS ID or SSS UMID Card from Social Security System (SSS)",
            "status": 1
        },
        {
            "id": 3,
            "name": "GSIS ID or GSIS UMID Card Government Service Insurance System (GSIS)",
            "status": 1
        },
        {
            "id": 4,
            "name": "Driver's License Land Transportation Office (LTO)",
            "status": 1
        },
        {
            "id": 5,
            "name": "PRC ID Professional Regulatory Commission (PRC)",
            "status": 1
        },
        {
            "id": 6,
            "name": "OWWA ID Overseas Workers Welfare Administration (OWWA)",
            "status": 1
        },
        {
            "id": 7,
            "name": "iDOLE Card Department of Labor and Employment (iDOLE)",
            "status": 1
        },
        {
            "id": 8,
            "name": "Voter?s ID Commission on Elections (COMELEC)",
            "status": 1
        },
        {
            "id": 9,
            "name": "Voter?s Certification from the Officer of Election with Dry Seal",
            "status": 1
        },
        {
            "id": 10,
            "name": "Firearms License Philippine National Police (PNP)",
            "status": 1
        },
        {
            "id": 11,
            "name": "Senior Citizen ID from Local Government Unit (LGU)",
            "status": 1
        },
    ]);
    
    const data = ref({
        first_name: '',
        middle_name: '',
        last_name: '',
        surfix: '',
        email: '',
        gender: '',
        dob: '',
        father_name: '',
        mother_name: '',
        govt_issue_id_type: '',
        govt_issue_id_number: '',
        email: '',
        mobile: '',
        religion_id: '',
        marital_status: '',
        pre_address: '',
        per_address: '',
        photo: '',
        signature: '',
    })

    const setPhoto = (photo) => {
        data.value.photo = photo;
    }
    // const onPhotoChange = (e) => {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //         data.value.photo = e.target.result;
    //     }
    //     reader.readAsDataURL(file);
    // }
    const onSignatureChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            data.value.signature = e.target.result;
        }
        reader.readAsDataURL(file);
    }

    const emit = defineEmits(['citizen_data']);
    const validations_errors = ref({});
    const skip_validations = ref([
        'middle_name', 
        'surfix'
    ]);
    const submitModal = () => {
        validations_errors.value = {};
        // Check validations
        const errors = Object.keys(data.value).filter(item => !data.value[item] && !skip_validations.value.includes(item));
        if(errors.length > 0){
            errors.map(item => {
                validations_errors.value[item] = `${item} is required`;
            });
            // console.log(validations_errors.value);
            return;
        }
        emit('citizen_data', data.value);
    }
    const cancel = () => {
        emit('citizen_data', data.value.isOpen = false);
    }
</script>
<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/50" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0"
                        enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100"
                        leave-to="opacity-0">
                        <div class="fixed inset-0 bg-black/25" />
                    </TransitionChild>

                    <div class="fixed inset-0 overflow-y-auto">
                        <div class="flex h-screen items-center justify-center text-center">
                            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                                enter-to="opacity-100 scale-100" leave="duration-200 ease-in"
                                leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                                <DialogPanel
                                    class="w-full h-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <DialogTitle as="h3" class="text-[20px] md:text-[25px] font-semibold text-center">
                                        Registration
                                    </DialogTitle>
                                    <div class="h-full px-2 py-6">
                                        <div class="flex flex-col justify-between h-full w-full p-6 border border-gray-200 rounded-md shadow-xl">
                                            <div class="mt-2 overflow-y-auto px-4">
                                                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                                    <div class="pb-6">
                                                        <div class="flex items-center">
                                                            <InputLabel :value="'Photo'" class="text-base mb-1" />
                                                            <span v-if="!skip_validations.includes('photo')" class="text-red-500 text-lg pl-2">*</span>
                                                        </div>
                                                        <div class="mt-1 flex flex-col items-start justify-center h-[225px]">
                                                            <PhotoBlock :getPhoto="data.photo" @set_photo="setPhoto" />
                                                            <InputError class="text-sm mt-2" :message="validations_errors.photo" :text_size="'text-sm'" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                                    <div class="">
                                                        <div class="flex items-center">
                                                            <InputLabel :value="'First Name'" class="text-base mb-1" />
                                                            <span v-if="!skip_validations.includes('first_name')" class="text-red-500 text-lg pl-2">*</span>
                                                        </div>
                                                        <input 
                                                            type="text" 
                                                            v-model="data.first_name"
                                                            class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        >
                                                        <InputError class="text-sm mt-2" :message="validations_errors.first_name" :text_size="'text-sm'" />
                                                    </div>
                                                    <div class="">
                                                        <div class="flex items-center">
                                                            <InputLabel :value="'Middle Name'" class="text-base mb-1" />
                                                            <span v-if="!skip_validations.includes('middle_name')" class="text-red-500 text-lg pl-2">*</span>
                                                        </div>
                                                        <input 
                                                            type="text" 
                                                            v-model="data.middle_name"
                                                            class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        >
                                                        <InputError class="text-sm mt-2" :message="validations_errors.middle_name" :text_size="'text-sm'" />
                                                    </div>
                                                    <div class="">
                                                        <div class="flex items-center">
                                                            <InputLabel :value="'Last Name'" class="text-base mb-1" />
                                                            <span v-if="!skip_validations.includes('last_name')" class="text-red-500 text-lg pl-2">*</span>
                                                        </div>
                                                        <input 
                                                            type="text" 
                                                            v-model="data.last_name"
                                                            class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        >
                                                        <InputError class="text-sm mt-2" :message="validations_errors.last_name" :text_size="'text-sm'" />
                                                    </div>
                                                    <div class="">
                                                        <div class="flex items-center">
                                                            <InputLabel :value="'Suffix'" class="text-base mb-1" />
                                                            <span v-if="!skip_validations.includes('surfix')" class="text-red-500 text-lg pl-2">*</span>
                                                        </div>
                                                        <input 
                                                            type="text" 
                                                            v-model="data.surfix"
                                                            class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        >
                                                        <InputError class="text-sm mt-2" :message="validations_errors.surfix" :text_size="'text-sm'" />
                                                    </div>
                                                    <div class="">
                                                        <div class="flex items-center">
                                                            <InputLabel :value="'Email'" class="text-base mb-1" />
                                                            <span v-if="!skip_validations.includes('email')" class="text-red-500 text-lg pl-2">*</span>
                                                        </div>
                                                        <input 
                                                            type="email" 
                                                            v-model="data.email"
                                                            class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        >
                                                        <InputError class="text-sm mt-2" :message="validations_errors.email" :text_size="'text-sm'" />
                                                    </div>
                                                    <div class="">
                                                        <div class="flex items-center">
                                                            <InputLabel :value="'Gender'" class="text-base mb-1" />
                                                            <span v-if="!skip_validations.includes('gender')" class="text-red-500 text-lg pl-2">*</span>
                                                        </div>
                                                        <select 
                                                            v-model="data.gender" 
                                                            class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        >
                                                            <option value="">Select</option>
                                                            <option v-for="(item, index) in gender" :key="index" :value="item.id">
                                                                {{ item.gender_name }}
                                                            </option>
                                                        </select>
                                                        <InputError class="text-sm mt-2" :message="validations_errors.gender" :text_size="'text-sm'" />
                                                    </div>
                                                    <div class="">
                                                        <div class="flex items-center">
                                                            <InputLabel :value="'Date of Birth'" class="text-base mb-1" />
                                                            <span v-if="!skip_validations.includes('dob')" class="text-red-500 text-lg pl-2">*</span>
                                                        </div>
                                                        <input 
                                                            type="date" 
                                                            v-model="data.dob"
                                                            class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        >
                                                        <InputError class="text-sm mt-2" :message="validations_errors.dob" :text_size="'text-sm'" />
                                                    </div>
                                                    <div class="">
                                                        <div class="flex items-center">
                                                            <InputLabel :value="'Father Name'" class="text-base mb-1" />
                                                            <span v-if="!skip_validations.includes('father_name')" class="text-red-500 text-lg pl-2">*</span>
                                                        </div>
                                                        <input 
                                                            type="text" 
                                                            v-model="data.father_name"
                                                            class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        >
                                                        <InputError class="text-sm mt-2" :message="validations_errors.father_name" :text_size="'text-sm'" />
                                                    </div>
                                                    <div class="">
                                                        <div class="flex items-center">
                                                            <InputLabel :value="'Mother Name'" class="text-base mb-1" />
                                                            <span v-if="!skip_validations.includes('mother_name')" class="text-red-500 text-lg pl-2">*</span>
                                                        </div>
                                                        <input 
                                                            type="text" 
                                                            v-model="data.mother_name"
                                                            class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        >
                                                        <InputError class="text-sm mt-2" :message="validations_errors.mother_name" :text_size="'text-sm'" />
                                                    </div>
                                                    <div class="">
                                                        <div class="flex items-center">
                                                            <InputLabel :value="'Govt Issue ID Type'" class="text-base mb-1" />
                                                            <span v-if="!skip_validations.includes('govt_issue_id_type')" class="text-red-500 text-lg pl-2">*</span>
                                                        </div>
                                                        <select 
                                                            v-model="data.govt_issue_id_type" 
                                                            class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        >
                                                            <option value="">Select</option>
                                                            <option v-for="(item, index) in govt_issue_list" :key="index" :value="item.id">
                                                                {{ item.name }}
                                                            </option>
                                                        </select>
                                                        <InputError class="text-sm mt-2" :message="validations_errors.govt_issue_id_type" :text_size="'text-sm'" />
                                                    </div>
                                                    <div class="">
                                                        <div class="flex items-center">
                                                            <InputLabel :value="'Govt Issue ID Number'" class="text-base mb-1" />
                                                            <span v-if="!skip_validations.includes('govt_issue_id_number')" class="text-red-500 text-lg pl-2">*</span>
                                                        </div>
                                                        <input 
                                                            type="text" 
                                                            v-model="data.govt_issue_id_number"
                                                            class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        >
                                                        <InputError class="text-sm mt-2" :message="validations_errors.govt_issue_id_number" :text_size="'text-sm'" />
                                                    </div>
                                                    <div class="">
                                                        <div class="flex items-center">
                                                            <InputLabel :value="'Mobile Number'" class="text-base mb-1" />
                                                            <span v-if="!skip_validations.includes('mobile')" class="text-red-500 text-lg pl-2">*</span>
                                                        </div>
                                                        <input 
                                                            type="text" 
                                                            v-model="data.mobile"
                                                            class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        >
                                                        <InputError class="text-sm mt-2" :message="validations_errors.mobile" :text_size="'text-sm'" />
                                                    </div>
                                                    <div class="">
                                                        <div class="flex items-center">
                                                            <InputLabel :value="'Religion'" class="text-base mb-1" />
                                                            <span v-if="!skip_validations.includes('religion_id')" class="text-red-500 text-lg pl-2">*</span>
                                                        </div>
                                                        <select 
                                                            v-model="data.religion_id" 
                                                            class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        >
                                                            <option value="">Select</option>
                                                            <option v-for="(item, index) in religions" :key="index" :value="item.id">
                                                                {{ item.name }}
                                                            </option>
                                                        </select>
                                                        <InputError class="text-sm mt-2" :message="validations_errors.religion_id" :text_size="'text-sm'" />
                                                    </div>
                                                    <div class="">
                                                        <div class="flex items-center">
                                                            <InputLabel :value="'Marital Status'" class="text-base mb-1" />
                                                            <span v-if="!skip_validations.includes('marital_status')" class="text-red-500 text-lg pl-2">*</span>
                                                        </div>
                                                        <select 
                                                            v-model="data.marital_status" 
                                                            class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        >
                                                            <option value="">Select</option>
                                                            <option v-for="(item, index) in marital_status" :key="index" :value="item.id">
                                                                {{ item.name }}
                                                            </option>
                                                        </select>
                                                        <InputError class="text-sm mt-2" :message="validations_errors.marital_status" :text_size="'text-sm'" />
                                                    </div>
                                                    <div class="">
                                                        <div class="flex items-center">
                                                            <InputLabel :value="'Present Address'" class="text-base mb-1" />
                                                            <span v-if="!skip_validations.includes('pre_address')" class="text-red-500 text-lg pl-2">*</span>
                                                        </div>
                                                        <input 
                                                            type="text" 
                                                            v-model="data.pre_address"
                                                            class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        >
                                                        <InputError class="text-sm mt-2" :message="validations_errors.pre_address" :text_size="'text-sm'" />
                                                    </div>
                                                    <div class="">
                                                        <div class="flex items-center">
                                                            <InputLabel :value="'Permanent Address'" class="text-base mb-1" />
                                                            <span v-if="!skip_validations.includes('per_address')" class="text-red-500 text-lg pl-2">*</span>
                                                        </div>
                                                        <input 
                                                            type="text" 
                                                            v-model="data.per_address"
                                                            class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        >
                                                        <InputError class="text-sm mt-2" :message="validations_errors.per_address" :text_size="'text-sm'" />
                                                    </div>
                                                    <div class="">
                                                        <div class="flex items-center">
                                                            <InputLabel :value="'Signature'" class="text-base mb-1" />
                                                            <span v-if="!skip_validations.includes('signature')" class="text-red-500 text-lg pl-2">*</span>
                                                        </div>
                                                        <input 
                                                            type="file" 
                                                            @change="onSignatureChange" 
                                                            accept="image/*"
                                                            class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        >
                                                        <InputError class="text-sm mt-2" :message="validations_errors.signature" :text_size="'text-sm'" />
                                                    </div>
                                                </div>
                                            </div>
    
                                            <div class="mt-4">
                                                <div class="flex justify-end gap-3">
                                                    <button type="button"
                                                        class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                                        @click="cancel">Cancel
                                                    </button>
                                                    <button type="button"
                                                        class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                        @click="submitModal">Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>