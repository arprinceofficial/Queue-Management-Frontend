<script setup>
	useHead({ title: 'Service' });
	definePageMeta({ middleware: ['auth-office'], layout: 'office' });

    const service_list = [
        {
            id: 1,
            name: 'Inquiry',
            icon: 'fa-solid fa-messages-question',
            color: '0083C4',
            route: '/service/inquiry'
        },
        {
            id: 2,
            name: 'Avail Service',
            icon: 'fa-duotone fa-solid fa-gears',
            color: '009966',
            route: '/service/application'
        },
        {
            id: 3,
            name: 'Complaint',
            icon: 'fa-regular fa-memo-circle-info',
            color: 'EC9C0E',
            route: '/service/payment'
        },
    ]
</script>

<template>
    <div class="my-8">
        <div class="w-full flex justify-center">
            <div class="w-[90%] h-[100px] bg-[linear-gradient(90deg,_#FFF_0%,_#EDEDED_53%,_#FFF_100%)] flex items-center justify-center">
                <h1 class="text-[54px] font-semibold text-gray-900 ">Select Service</h1>
            </div>
        </div>
    
        <div v-for="(item, index) in service_list" :key="index" class="mt-16 flex justify-center">
            <NuxtLink :to="item.route">
                <div class="w-[500px] h-[288px] rounded-[20px] flex flex-col items-center justify-center" :style="{ backgroundColor:`#${item.color}` }">
                    <i class="text-[#FFF] text-[54px]" :class="item.icon"></i>
                    <h1 class="text-white text-[54px] font-semibold">{{ item.name }}</h1>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>