<script setup>
    useHead({ title: 'Home' });
    definePageMeta({ middleware: ['auth-agent'], layout: 'agent' });
    const agent_user = useState('agent_user')
</script>
<template>
    <!-- <pre>{{ agent_user }}</pre> -->
    <div class="min-h-[calc(100vh-75px)] flex flex-col justify-between items-center py-[10px]">
        <AgentSelectCounter v-if="!agent_user?.data?.queue_counter" />
        <AgentMainScreen v-else />
    </div>
</template>