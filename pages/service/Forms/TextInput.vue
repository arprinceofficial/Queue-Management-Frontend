<script setup>
    const { office_user } = officeAuth();
    const props = defineProps({
        data: Object,
        preview_mode: Boolean,
        error: String
    })
    const emit = defineEmits(['update_form']);
    emit('update_form', props.data);
</script>
<template>
    <div class="mt-2 lg:mt-6">
        <div class="flex">
            <InputLabel :value="data.label" class="text-[14px] lg:text-[25px] mb-1" />
            <span v-if="data.required" class="text-red-500 text-[14px] lg:text-[25px] pl-2">*</span>
        </div>
        <div v-if="!preview_mode" class="flex">
            <span v-if="data.type == 'number'" class="flex items-center h-[30px] lg:h-[72px] text-[12px] lg:text-[20px] rounded-lg px-3 mr-3  mt-1 border-[2px] border-green-500 rounded-lg">
                {{ office_user.country_code }}
            </span>
            <InputText
                :type="data.type"
                class="h-[35px] lg:h-[72px] text-[12px] lg:text-[20px] rounded-lg"
                :class="[data.type == 'number' ? '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' : '', error ? 'border-red-500' : '']"
                v-model="data.value"   
                :placeholder="data.place_holder"/>
        </div>
        <div v-else class="flex flex-wrap gap-3 mt-1">
            <div class="h-[30px] lg:h-[72px] text-[12px] lg:text-[20px] rounded-lg flex w-full border-[1px] border-[solid] border-gray-300 [box-shadow:0px_1px_3px_0px_rgba(0,_0,_0,_0.05)] items-center px-3 bg-[#F7F7F7] cursor-not-allowed">
                <div v-if="data.type == 'number'">{{ office_user.country_code }}&nbsp;</div>
                {{ data.value }}
            </div>
        </div>
        <InputError class="mt-1 lg:mt-2" :message="error" />
    </div>
</template>