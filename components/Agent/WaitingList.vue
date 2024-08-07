<script setup>
    const { 
        $formatDateTimeHour
    } = useNuxtApp();
    const props = defineProps({
		data: {
            type: Array,
            required: true
        }
	});
</script>
<template>
    <!-- <pre>{{ data }}</pre> -->
    <div v-for="(item, index) in data" :key="index" class="p-3 rounded-[3px] bg-[#FFF] border-[5px] border-y-0 border-[solid] border-[#EC9C0E] mb-3 flex items-center justify-between">
        <div class="flex">
            <p class="pr-5 text-[13px] md:text-[15px] font-semibold">Token No : {{ item.token }}</p>
            <div class="flex gap-3 text-[13px] md:text-[15px] font-semibold">
                <p>Services : <span class="text-[#EC9C0E]">{{ item.service.title }}</span></p>
            </div>
        </div>
        <p class="text-[10px] md:text-[13px] text-[#535353]">Token Generated on: {{ $formatDateTimeHour(item.created_at) }}</p>
    </div>
</template>