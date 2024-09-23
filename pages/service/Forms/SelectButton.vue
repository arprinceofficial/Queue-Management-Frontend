<script setup>
    const props = defineProps({
        data: Object,
        preview_mode: Boolean,
        error: String
    })
    const emit = defineEmits(['update_form']);
    emit('update_form', props.data);
</script>
<template>
    <!-- {{ data.options }} -->
    <div class="mt-2 lg:mt-6">
        <div class="flex">
            <InputLabel :value="data.label" class="text-[14px] lg:text-[25px] mb-1" />
            <span v-if="data.required" class="text-red-500 text-[14px] lg:text-[25px] pl-2">*</span>
        </div>
        <div v-if="!preview_mode" class="flex flex-wrap gap-2 mt-2 lg:gap-3 lg:mt-3">
            <div @click="data.value = item.id" :class="[{ 'bg-[#009A67] text-white border-[#009A67]' : data.value == item.id }, error ? 'border-red-500' : '']"
                v-for="(item, index) in data.options" :key="index"
                class="rounded-[25px] inline-flex items-center border border-[#ddddd] px-3 py-1 lg:px-5 lg:py-2 text-[12px] lg:text-base font-medium transition shadow-sm hover:border-[#009A67] focus:outline-none outline-none cursor-pointer">
                {{ item.name }}
            </div>
        </div>
        <div v-else class="flex flex-wrap gap-2 mt-2 lg:gap-3 lg:mt-3">
            <div class="rounded-[25px] inline-flex items-center border border-[#ddddd] px-3 py-1 lg:px-5 lg:py-2 text-[12px] lg:text-base bg-[#009A67] text-white border-[#009A67] font-medium transition shadow-sm">
                {{ data.options.find(item => item.id == data.value).name }}
            </div>
        </div>
        <InputError class="mt-1 lg:mt-2" :message="error" />
    </div>
</template>