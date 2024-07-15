<script setup>
    const props = defineProps({
        error_data: Object
    })
</script>
<template>
    <div class="err_msg mb-4">
        <div v-for="error in error_data" class="flex flex-row items-center gap-1">
            <template v-if="error.status">
                <i class="fa fa-times-circle"></i>
                <span>{{ error.msg }}</span>
            </template>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .err_msg{
        font-size: 12px;        
        color: #CD0000
    }
    .dark {
        .err_msg{
            color: #ff6565
        }
    }
</style>