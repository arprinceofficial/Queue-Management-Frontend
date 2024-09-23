<script setup>
    definePageMeta({ middleware: ['auth-office'], layout: 'office' });
    const data = ref({});
    const route = useRoute();
    // get token from route
    const token = route.query.token;
    data.value = { token };

    const router = useRouter();
    setTimeout(() => {
        router.push('/service');
    }, 3000);
</script>
<template>
    <div class="h-[calc(100vh-60px)] lg:h-[calc(100vh-76px)]">
        <ServiceSuccessV2 :data="data" />
    </div>
</template>