<script setup>
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
            <p class="pr-5 text-[13px] md:text-[15px] 2xl:text-[20px] font-semibold">Token No : {{ item.token_no }}</p>
            <div class="flex gap-3 text-[13px] md:text-[15px] 2xl:text-[20px] font-semibold">
                <p>Services : <span class="text-[#EC9C0E]">{{ item.service_name }}</span></p>
            </div>
        </div>
        <p class="text-[10px] md:text-[13px] 2xl:text-[17px] text-[#535353]">Token Generated on {{ item.token_generated }}</p>
    </div>
</template>