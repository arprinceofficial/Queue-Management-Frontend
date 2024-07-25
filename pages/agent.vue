<script setup>
	useHead({ title: 'Agent Login' });
	definePageMeta({ middleware: ['guest'], layout: 'guest' });
</script>
<template>
	<div class="min-h-screen flex items-center justify-center">
		<AuthAgentLogin />
	</div>
</template>