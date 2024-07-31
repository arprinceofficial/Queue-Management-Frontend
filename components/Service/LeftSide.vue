<script setup>
    const { $api_office_queue_services } = useNuxtApp();
    const route = useRoute();
	const current_slug = computed( () => route.params.slug );

    const queue_service_list = useState('queue_service_list', () => []);
    let data = {
        "status": "success",
        "error": false,
        "count": 3,
        "data": [
            {
                "id": 1,
                "name": "Inquiry",
                "icon": "far fa-messages-question",
                "slug": "inquiry",
                "route": "inquiry",
                "color": "0083C4",
                "fields": [
                    {
                        "label": "Name",
                        "name": "name",
                        "type": "text",
                        "place_holder": "i.e John doe",
                        "required": true
                    },
                    {
                        "label": "Priority lane",
                        "name": "priority_lane",
                        "type": "radio",
                        "data_type": "dunamic",
                        "options": [
                            {
                                "id": 1,
                                "name": "Regular"
                            },
                            {
                                "id": 2,
                                "name": "PWD\/Pregnant\/IP"
                            }
                        ],
                        "required": true
                    },
                    {
                        "label": "Service",
                        "name": "service",
                        "type": "radio",
                        "data_type": "static",
                        "options": [
                            {
                                "id": 21,
                                "name": "Grievance Redress Service"
                            },
                            {
                                "id": 2,
                                "name": "Certificate of Live Birth (COLB)"
                            },
                            {
                                "id": 1,
                                "name": "Business Permit Registration and Renewal"
                            }
                        ],
                        "required": true
                    }
                ]
            },
            {
                "id": 2,
                "name": "Avail Service",
                "icon": "far fa-gears",
                "slug": "avail-service",
                "route": "avail-service",
                "color": "009966",
                "fields": [
                    {
                        "label": "Name",
                        "name": "name",
                        "type": "text",
                        "place_holder": "i.e John doe",
                        "required": true
                    },
                    {
                        "label": "Email",
                        "name": "email",
                        "type": "email",
                        "place_holder": "i.e example@xyz.com",
                        "required": true
                    },
                    {
                        "label": "Mobile",
                        "name": "mobile",
                        "type": "number",
                        "place_holder": "i.e +63-2-1234-5678",
                        "required": true
                    },
                    {
                        "label": "Gender",
                        "name": "gender",
                        "type": "radio",
                        "data_type": "static",
                        "options": [
                            {
                                "id": 1,
                                "name": "Male"
                            },
                            {
                                "id": 2,
                                "name": "Female"
                            }
                        ],
                        "required": true
                    },
                    {
                        "label": "Service",
                        "name": "service",
                        "type": "radio",
                        "data_type": "static",
                        "options": [
                            {
                                "id": 21,
                                "name": "Grievance Redress Service"
                            },
                            {
                                "id": 2,
                                "name": "Certificate of Live Birth (COLB)"
                            },
                            {
                                "id": 1,
                                "name": "Business Permit Registration and Renewal"
                            }
                        ],
                        "required": true
                    },
                    {
                        "label": "Priority lane",
                        "name": "priority_lane",
                        "type": "radio",
                        "data_type": "dunamic",
                        "options": [
                            {
                                "id": 1,
                                "name": "Regular"
                            },
                            {
                                "id": 2,
                                "name": "PWD\/Pregnant\/IP"
                            }
                        ],
                        "required": true
                    }
                ]
            },
            {
                "id": 3,
                "name": "Complaint",
                "icon": "far fa-memo-circle-info",
                "slug": "complaint",
                "route": "complaint",
                "color": "EC9C0E",
                "fields": [
                    {
                        "label": "Name",
                        "name": "name",
                        "type": "text",
                        "place_holder": "i.e John doe",
                        "required": true
                    },
                    {
                        "label": "Email",
                        "name": "email",
                        "type": "email",
                        "place_holder": "i.e example@xyz.com",
                        "required": true
                    },
                    {
                        "label": "Mobile",
                        "name": "mobile",
                        "type": "number",
                        "place_holder": "i.e +63-2-1234-5678",
                        "required": true
                    },
                    {
                        "label": "Gender",
                        "name": "gender",
                        "type": "radio",
                        "data_type": "static",
                        "options": [
                            {
                                "id": 1,
                                "name": "Male"
                            },
                            {
                                "id": 2,
                                "name": "Female"
                            }
                        ],
                        "required": true
                    },
                    {
                        "label": "Service",
                        "name": "service",
                        "type": "radio",
                        "data_type": "static",
                        "options": [
                            {
                                "id": 21,
                                "name": "Grievance Redress Service"
                            },
                            {
                                "id": 2,
                                "name": "Certificate of Live Birth (COLB)"
                            },
                            {
                                "id": 1,
                                "name": "Business Permit Registration and Renewal"
                            }
                        ],
                        "required": true
                    },
                    {
                        "label": "Priority lane",
                        "name": "priority_lane",
                        "type": "radio",
                        "data_type": "dunamic",
                        "options": [
                            {
                                "id": 1,
                                "name": "Regular"
                            },
                            {
                                "id": 2,
                                "name": "PWD\/Pregnant\/IP"
                            }
                        ],
                        "required": true
                    }
                ]
            }
        ]
    };
    queue_service_list.value = data.data;

    const load_services = async () => {
        if (queue_service_list.value.length > 0) return;
        // loader.value = true;
        try{
            const getData = await $fetchOffice($api_office_queue_services, {
                method: 'POST',
            });
            // queue_service_list.value = getData.data;
        } catch(e){
            console.log('Get Message',e.message);
        } finally {
            // loader.value = false;
        }
    }

    onMounted(() => {
        // load_services();
    });
</script>
<template>
    <!-- {{ current_slug }} -->
    <!-- <pre>{{ queue_service_list }}</pre> -->
    <div>
        <div class="bg-[#D4E7DF] h-full w-[300px] py-3 overflow-auto">
            <div class="text-[#4D5155] text-[22px] font-medium leading-[normal] mr-3"
                :class="current_slug == item.route ? 'rounded-tl-none rounded-br-[40px] rounded-tr-[40px] rounded-bl-none bg-[#FFF]' : ''"
                v-for="(item, index) in queue_service_list" :key="index">
                <NuxtLink :to="item.route">
                    <div class="flex items-center">
                        <span v-if="current_slug == item.route" class="w-[6px] h-[40px] ml-2 border-[#0083C4] border-[3px] rounded-xl"></span>
                        <div class="p-4">
                            <i class="text-[22px] pr-3" :class="[item.icon, current_slug == item.route ? 'text-[#0083C4]' : 'text-[#4D5155] ']"></i>
                            <span class="text-[#4D5155] text-[22px]">{{ item.name }}</span>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>