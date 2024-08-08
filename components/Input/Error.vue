<script setup>
	defineProps({
		message: {
			type: [String, Object, Array]
		},
		text_size: {
			type: String,
			default: 'text-xl'
		}
	});
</script>

<template>
	<div v-show="message">
		<p class="text-red-600 dark:text-red-400" :class="text_size">
			{{ message }}
		</p>
	</div>
</template>
