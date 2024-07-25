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
		class="block w-full focus:border-green-500 focus:ring-green-500 mt-1 block items-center rounded-[50px] border-[1px] border-[solid] border-[var(--gray-300,#D1D5DB)] bg-[var(--white,_#FFF)] [box-shadow:0px_1px_3px_0px_rgba(0,_0,_0,_0.05)]"
		:value="modelValue"
		@input="$emit('update:modelValue', $event.target.value)"
		ref="input" />
</template>
