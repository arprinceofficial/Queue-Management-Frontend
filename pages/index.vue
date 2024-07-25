<script setup>
	useHead({ title: 'Office Login' });
	definePageMeta({ middleware: ['guest'], layout: 'guest' });
	const agent_user = agentUser();
</script>
<template>
	<div class="min-h-screen flex flex-col justify-between items-center">
		<AuthOfficeLogin />
	</div>
</template>