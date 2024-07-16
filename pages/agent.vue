<script setup>
	useHead({ title: 'Agent Login' });
	definePageMeta({ middleware: ['guest'], layout: 'guest' });
</script>
<template>
	<AuthAgentLogin />
</template>