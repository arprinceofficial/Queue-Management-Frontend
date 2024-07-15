<script setup>
    useHead({
        titleTemplate: `Queue | %s`,
    })
</script>
<template>
    <ClientOnly fallbackTag="span">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <template #fallback>
            <div class="init_loader">
                <LoaderSpinkitBounceLoader />
            </div>
        </template>
    </ClientOnly>
</template>
<style lang="scss" scoped>
.init_loader {
    @extend .init-loader-basic;
    background-color: $init_loader_bg_color_opc;
    color: #fff;
    text-shadow: 0 0 5px #000;
    z-index: 1000
}
</style>