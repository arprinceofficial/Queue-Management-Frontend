<script setup>
	useHead({ title: 'Office Login' });
	definePageMeta({ middleware: ['guest'], layout: 'guest' });
	const agent_user = agentUser();
</script>
<template>
	<AuthOfficeLogin />
</template>