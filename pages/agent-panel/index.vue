<script setup>
	useHead({ title: 'Home' });
	definePageMeta({ middleware: ['auth-agent'], layout: 'agent' });
</script>

<template>
    <div class="min-h-[calc(100vh-75px)] flex flex-col justify-between items-center pt-6 pt-8">
        Agent Panel
    </div>
</template>