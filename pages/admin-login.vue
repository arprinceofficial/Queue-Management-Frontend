<script setup>
	useHead({ title: 'Admin Login' });
	definePageMeta({ middleware: ['guest'], layout: 'guest' });
</script>
<template>
	<div class="min-h-screen flex items-center justify-center">
		<AuthAdminLogin />
	</div>
</template>