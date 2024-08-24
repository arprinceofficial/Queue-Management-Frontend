<script setup>
    useHead({ title: 'Admin | Country' });
    definePageMeta({ middleware: ['auth-admin'], layout: 'admin' });
    const { 
        $api_admin_country_list,
        $api_admin_country_delete,
    } = useNuxtApp();
    const route = useRoute();
    // const pagination_config = ref({
    //     data: {
    //         current_page: 1,
    //         from: 1,
    //         last_page: 10,
    //         per_page: 10,
    //         to: 10,
    //         total: 100
    //     },
    //     lang: 'en',
    //     align: 'center',
    //     action: ''
    // })
    const status = ref('');
    const search = ref('');
    const pagination_config = ref({
        data: [],
        lang: 'en',
        align: 'center',
        action: ''
    });
    const loader = ref(false);
    const admin_country_list = useState('admin_country_list', () => []);
    const loadCountryList = async () => {
        loader.value = true;
        try{
            const getData = await $fetchAdmin($api_admin_country_list, {
                method: 'POST',
                body: {
                    page: route.query.page ? route.query.page : 1,
                    limit: 10,
                    search: search.value,
                    status: status.value,
                },
            });
            admin_country_list.value = getData.data;
            pagination_config.value.data = getData.pagination;
        } catch(e){
            console.log('Get Message',e.message);
        } finally {
            loader.value = false;
        }
    }

    onMounted(() => {
        loadCountryList();
    });

    watch(() => route.query, (to) => {
        loadCountryList();
    })

    // Country Add Edit Modal Handler
    const data = ref({});
    const modal_title = ref('');
    const is_open_modal = ref(false);
    const receivedData = (data) => {
        is_open_modal.value = false;
        console.log('Received Data', data);

        modal_title.value == 'Add' ? 
        admin_country_list.value.push(data) :
        admin_country_list.value = admin_country_list.value.map(item => item.id == data.id ? data : item); 
    }
    const addCountry = () => {
        data.value = {};
        modal_title.value = 'Add';
        is_open_modal.value = true;
    }
    const editCountry = (item) => {
        data.value = item;
        modal_title.value = 'Edit';
        is_open_modal.value = true;
    }

    // Counter Delete Handler
    const is_loading = ref(false);
    const deleteCountry = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete this item?');
        if (!confirm) return;
        try{
            is_loading.value = true;
            const getData = await $fetchAdmin($api_admin_country_delete, {
                method: 'POST',
                body: {id: id},
            });
            if (getData.status == true) {
                admin_country_list.value = admin_country_list.value.filter(item => item.id != id);
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
                <div class="h-full w-full overflow-auto">
                    <div class="w-full flex justify-between items-center pt-5 px-8 mb-4">
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-4">
                                <div class="flex items-center gap-2">
                                    <label for="search" class="text-[#4D5155] dark:text-gray-200">Search</label>
                                    <input type="text" id="search" class="border border-gray-200 rounded-lg px-3 py-2" v-model="search" @input="loadCountryList">
                                </div>
                                <div class="flex items-center gap-3">
                                    <label for="status" class="text-[#4D5155] dark:text-gray-200">Status</label>
                                    <select v-model="status" @change="loadCountryList" id="status" class="border border-gray-200 rounded-lg px-3 py-2 pr-8">
                                        <option value="">All</option>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button @click="addCountry" class="bg-[#0083C4] text-white py-2 px-4 rounded-lg ml-4">
                            <i class="fas fa-plus pr-1"></i>
                            Add Country
                        </button>
                    </div>
                    <LoaderSpinkitBounceLoader v-if="loader" class="w-full"/>
                    <div v-else class="px-6 pb-2 flex flex-col justify-between h-full w-full overflow-auto">
                        <div class="mt-4 border border-gray-200 rounded-lg">
                            <div class="border-b border-gray-200">
                                <h4 class="text-[18px] font-semibold dark:text-gray-200 py-2 px-4">Country List</h4>
                            </div>
                            <div class="p-4">
                                <div class="custom_table overflow-auto border-b border-gray-200">
                                    <table class="table border table-auto">
                                        <thead class="sticky z-10 top-0">
                                            <tr>
                                                <th class="sticky left-0" width="15%">
                                                    <div class="flex flex-row items-center justify-center gap-2">
                                                        <span>SL No.</span>
                                                    </div>
                                                </th>
                                                <th width="15%">
                                                    <div class="flex flex-row items-center justify-center gap-2">
                                                        <span>Country Name</span>
                                                    </div>
                                                </th>
                                                <th width="15%">
                                                    <div class="flex flex-row items-center justify-center gap-2">
                                                        <span>Country Code</span>
                                                    </div>
                                                </th>
                                                <th width="10%">
                                                    <div class="flex flex-row items-center justify-center gap-2">
                                                        <span>ISO</span>
                                                    </div>
                                                </th>
                                                <th width="10%">
                                                    <div class="flex flex-row items-center justify-center gap-2">
                                                        <span>Status</span>
                                                    </div>
                                                </th>
                                                <th width="20%">
                                                    <div class="flex flex-row items-center justify-center gap-2">
                                                        <span>Action</span>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="">
                                            <tr v-for="(item, index) in admin_country_list" :key="index">
                                                <td class="sticky left-0">
                                                    <div class="flex justify-center items-center">
                                                        <!-- {{ index + 1 }} -->
                                                        {{ (pagination_config.data.current_page - 1) * pagination_config.data.per_page + index + 1 }}
                                                    </div>
                                                </td>
                                                <td>{{ item.country_name }}</td>
                                                <td>
                                                    <div class="flex justify-center items-center">
                                                        {{ item.country_code }}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="flex justify-center items-center">
                                                        {{ item.iso }}
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
                                                        <button @click="editCountry(item)" 
                                                            class="rounded-full bg-white py-1.5 px-4 text-green-500 shadow-sm ring-1 ring-inset ring-gray-100 hover:bg-green-50 cursor-pointer flex justify-center items-cernter">
                                                            Edit
                                                        </button>
                                                        <div @click="deleteCountry(item.id)"
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
                            <Pagination class="px-4" :config="pagination_config"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AdminCountryAddEdit 
            :isOpen="is_open_modal"
            :title="modal_title"
            :data="data"
            @add_country="receivedData"
            @cancel="cancelModal"
        />
        <LoaderModalSpin :isOpen="is_loading" />
    </div>
</template>