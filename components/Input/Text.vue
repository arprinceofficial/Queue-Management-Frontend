<script setup>
	import { onMounted, ref } from 'vue';

	defineProps({
		modelValue: {
			type: String,
			required: true
		}
	});

	defineEmits(['update:modelValue']);

	const input = ref(null);

	onMounted(() => {
		if (input.value.hasAttribute('autofocus')) {
			input.value.focus();
		}
	});

	defineExpose({ focus: () => input.value.focus() });
</script>

<template>
	<input
		class="block min-w-full focus:border-green-500 focus:ring-green-500 sm:text-xl text-[20px] mt-1 block h-[72.928px] pt-[16.346px] pr-[22.286px] pb-[15.428px] pl-[47.78px] items-center self-stretch rounded-[50.295px] border-[1.714px] border-[solid] border-[var(--gray-300,#D1D5DB)] bg-[var(--white,_#FFF)] [box-shadow:0px_1.714px_3.429px_0px_rgba(0,_0,_0,_0.05)]"
		:value="modelValue"
		@input="$emit('update:modelValue', $event.target.value)"
		ref="input" />
</template>
