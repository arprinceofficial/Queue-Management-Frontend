<script setup>
    useHead({ title: 'Admin | WT Screen' });
    definePageMeta({ middleware: ['auth-admin'], layout: 'admin' });
    const route = useRoute();
	const current_slug = computed( () => route.params.slug );
    const current_route = computed( () => route.name );
	const current_path = computed( () => route.path );
</script>
<template>
    <div class="h-[calc(100vh-76px)]">
        <div class="flex flex-col justify-between h-full">
            <div class="flex h-full">
                <AdminLeftSide />
                
                <div class="px-6 py-2 flex flex-col justify-between h-full w-full overflow-auto">
                   {{ current_slug }} <br> 
                   {{ current_route }} <br> 
                   {{ current_path }}
                </div>
            </div>
        </div>
    </div>
</template>