<script setup>
	defineProps({
		message: {
			type: [String, Object, Array]
		}
	});
</script>

<template>
	<div v-show="message">
		<p class="text-xl text-red-600 dark:text-red-400">
			{{ message }}
		</p>
	</div>
</template>
