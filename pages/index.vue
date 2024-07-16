<script setup>
	useHead({ title: 'Login' });
	definePageMeta({ middleware: ['guest'], layout: 'guest' });
	const agent_user = agentUser();
</script>
<template>
	s{{ agent_user }}
	<AuthOfficeLogin />
</template>