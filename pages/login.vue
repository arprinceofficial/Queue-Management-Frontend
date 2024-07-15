<script setup>
	useHead({ title: 'Login' });
	definePageMeta({ middleware: ['guest'], layout: 'guest' });
</script>
<template>
	<AuthLoginForm />
</template>