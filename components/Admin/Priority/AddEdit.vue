<script setup>
    import {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel,
        DialogTitle,
    } from '@headlessui/vue'

    const {
        $api_admin_priority_create,
        $api_admin_priority_update,
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
        name: '',
        short_name: '',
        status: 0,
    });
    
    watch(() => props.data, (value) => {
        if (value) {
            formData.value = {
                name: value.name,
                short_name: value.short_name,
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

    const emit = defineEmits(['add_priority', 'cancel']);
    const is_loading = ref(false);
    const createPriority = async () => {
        // console.log('Create Counter', getData.data);
        // formData.value.id = getData.data.id;
        try{
            is_loading.value = true;
            const getData = await $fetchAdmin($api_admin_priority_create, {
                method: 'POST',
                body: formData.value,
            });
            if(getData.status == true){
                emit('add_priority', getData.data);
            }
        } catch(e){
            console.log('Get Message',e.message);
        } finally {
            is_loading.value = false;
        }
    }
    const updatePriority = async () => {
        // console.log('Update Counter', getData.data);
        try{
            is_loading.value = true;
            formData.value.id = props.data.id;
            const getData = await $fetchAdmin($api_admin_priority_update, {
                method: 'POST',
                body: formData.value,
            });
            if(getData.status == true){
                emit('add_priority', getData.data);
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
                                {{ title }} Priority
                            </DialogTitle>
                            <div class="mt-2">
                                <!-- <pre>{{ data }}</pre> -->
                                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                    <div class="">
                                        <label for="name"
                                            class="block text-sm font-medium text-gray-700">Priority Name</label>
                                        <input type="text" name="name" id="name"
                                            v-model="formData.name"
                                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                    </div>
                                    <div class="">
                                        <label for="short_name"
                                            class="block text-sm font-medium text-gray-700">Priority Name</label>
                                        <input type="text" name="short_name" id="short_name"
                                            v-model="formData.short_name"
                                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
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
                                    @click="title == 'Add' ? createPriority() : updatePriority()">
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