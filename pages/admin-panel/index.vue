<script setup>
    useHead({ title: 'Admin Panel' });
    definePageMeta({ middleware: ['auth-admin'], layout: 'admin' });
    const admin_user = useState('admin_user')
</script>
<template>
    <pre>{{ admin_user }}</pre>
    <div class="min-h-[calc(100vh-75px)] flex flex-col justify-between items-center py-[10px]">
    </div>
</template>