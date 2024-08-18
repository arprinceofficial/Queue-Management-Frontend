<script setup>
useHead({ title: 'Admin Panel' });
definePageMeta({ middleware: ['auth-admin'], layout: 'admin' });
const admin_user = useState('admin_user')
</script>
<template>
    <!-- <pre>{{ admin_user }}</pre> -->
    <div class="h-[calc(100vh-76px)]">
        <div class="flex flex-col justify-between h-full">
            <div class="flex h-full">
                <AdminLeftSide />

                <div class="px-6 py-2 flex flex-col justify-start h-full w-full overflow-auto">
                    <h1 class="text-2xl font-bold text-[#4D5155]">Admin Panel</h1>
                    <div class="flex flex-col gap-4">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped></style>