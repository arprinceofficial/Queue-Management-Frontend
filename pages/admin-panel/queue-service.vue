<script setup>
    useHead({ title: 'Admin | Queue Service' });
    definePageMeta({ middleware: ['auth-admin'], layout: 'admin' });
    const { 
        $api_admin_queue_service_list,
        $api_admin_queue_service_delete,
    } = useNuxtApp();

    const loader = ref(false);
    const admin_queue_service_list = useState('admin_queue_service_list', () => []);
    const loadQueueServiceList = async () => {
        loader.value = true;
        try{
            const getData = await $fetchAdmin($api_admin_queue_service_list, {
                method: 'GET',
            });
            admin_queue_service_list.value = getData.data;
        } catch(e){
            console.log('Get Message',e.message);
        } finally {
            loader.value = false;
        }
    }

    onMounted(() => {
        loadQueueServiceList();
    });

    // Queue Service Add Edit Modal Handler
    const data = ref({});
    const modal_title = ref('');
    const is_open_modal = ref(false);
    const receivedData = (data) => {
        is_open_modal.value = false;
        console.log('Received Data', data);

        modal_title.value == 'Add' ? 
        admin_queue_service_list.value.push(data) :
        admin_queue_service_list.value = admin_queue_service_list.value.map(item => item.id == data.id ? data : item); 
    }
    const addQueueService = () => {
        data.value = {
            name: '',
            color: '',
            slug: '',
            route: '',
            icon: '',
            status: 0,
            fields: [],
        };
        modal_title.value = 'Add';
        is_open_modal.value = true;
    }
    const editQueueService = (item) => {
        data.value = item;
        modal_title.value = 'Edit';
        is_open_modal.value = true;
    }

    // Queue Service Delete Handler
    const is_loading = ref(false);
    const deleteQueueService = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete this item?');
        if (!confirm) return;
        try{
            is_loading.value = true;
            const getData = await $fetchAdmin($api_admin_queue_service_delete, {
                method: 'POST',
                body: {id: id},
            });
            if (getData.status == true) {
                admin_queue_service_list.value = admin_queue_service_list.value.filter(item => item.id != id);
            }
        } catch(e){
            console.log('Get Message',e.message);
        } finally {
            is_loading.value = false;
        }
    }

    const cancelModal = () => {
        is_open_modal.value = false;
        data.value = {};
    }
</script>
<template>
    <div class="h-[calc(100vh-76px)]">
        <div class="flex flex-col justify-between h-full">
            <div class="flex h-full">
                <AdminLeftSide />
                <!-- Right Side -->
                <LoaderSpinkitBounceLoader v-if="loader" class="w-full"/>
                <div v-else class="h-full w-full overflow-auto">
                    <div class="w-full flex justify-end pt-5 px-8">
                        <button @click="addQueueService" class="bg-[#0083C4] text-white py-2 px-4 rounded-lg ml-4 mb-4">
                            <i class="fas fa-plus pr-1"></i>
                            Add Queue Service
                        </button>
                    </div>
                    <div class="px-6 pb-2 flex flex-col justify-between w-full">
                        <div class="mt-4 border border-gray-200 rounded-lg">
                            <div class="border-b border-gray-200">
                                <h4 class="text-[18px] font-semibold dark:text-gray-200 py-2 px-4">Queue Service List</h4>
                            </div>
                            <div class="p-4">
                                <div class="custom_table overflow-auto border-b border-gray-200">
                                    <table class="table border table-auto">
                                        <thead class="sticky z-10 top-0">
                                            <tr>
                                                <th class="sticky left-0" width="10%">
                                                    <div class="flex flex-row items-center justify-center gap-2">
                                                        <span>SL No.</span>
                                                    </div>
                                                </th>
                                                <th width="10%">
                                                    <div class="flex flex-row items-center justify-center gap-2">
                                                        <span>Name</span>
                                                    </div>
                                                </th>
                                                <th width="15%">
                                                    <div class="flex flex-row items-center justify-center gap-2">
                                                        <span>Slug</span>
                                                    </div>
                                                </th>
                                                <th width="10%">
                                                    <div class="flex flex-row items-center justify-center gap-2">
                                                        <span>Route</span>
                                                    </div>
                                                </th>
                                                <th width="10%">
                                                    <div class="flex flex-row items-center justify-center gap-2">
                                                        <span>Icon</span>
                                                    </div>
                                                </th>
                                                <th width="10%">
                                                    <div class="flex flex-row items-center justify-center gap-2">
                                                        <span>Color</span>
                                                    </div>
                                                </th>
                                                <th width="10%">
                                                    <div class="flex flex-row items-center justify-center gap-2">
                                                        <span>Status</span>
                                                    </div>
                                                </th>
                                                <th width="15%">
                                                    <div class="flex flex-row items-center justify-center gap-2">
                                                        <span>Action</span>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="">
                                            <tr v-for="(item, index) in admin_queue_service_list" :key="index">
                                                <td class="sticky left-0">
                                                    <div class="flex justify-center items-center">
                                                        {{ index + 1 }}
                                                    </div>
                                                </td>
                                                <td>{{ item.name }}</td>
                                                <td>
                                                    <div class="flex flex-row items-center justify-center">
                                                        {{ item.slug }}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="flex flex-row items-center justify-center">
                                                        {{ item.route }}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="flex flex-row items-center justify-center">
                                                        <i :class="item.icon"></i>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="flex flex-row items-center justify-center">
                                                        <div class="w-6 h-6 rounded-full" :style="{backgroundColor: '#'+item.color}"></div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="flex justify-center items-center">
                                                        <span v-if="item.status == 1" class="text-green-500">Active</span>
                                                        <span v-else class="text-red-500">Inactive</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="flex justify-center items-center gap-2">
                                                        <button @click="editQueueService(item)" 
                                                            class="rounded-full bg-white py-1.5 px-4 text-green-500 shadow-sm ring-1 ring-inset ring-gray-100 hover:bg-green-50 cursor-pointer flex justify-center items-cernter">
                                                            Edit
                                                        </button>
                                                        <div @click="deleteQueueService(item.id)"
                                                            class="rounded-full bg-white py-1.5 px-4 text-red-500 shadow-sm ring-1 ring-inset ring-gray-100 hover:bg-red-50 cursor-pointer flex justify-center items-cernter">
                                                            Delete
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AdminQueueServiceAddEdit 
            :isOpen="is_open_modal"
            :title="modal_title"
            :data="data"
            @add_QueueService="receivedData"
            @cancel="cancelModal"
        />
        <LoaderModalSpin :isOpen="is_loading" />
    </div>
</template>