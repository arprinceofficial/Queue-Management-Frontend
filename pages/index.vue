<script setup>
	useHead({ title: 'Login' });
	definePageMeta({ middleware: ['guest-office'], layout: 'guest' });
</script>
<template>
	<AuthOfficeLogin />
</template>