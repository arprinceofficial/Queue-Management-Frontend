<script setup>
    useHead({ title: 'Admin Panel' });
    definePageMeta({ middleware: ['auth-admin'], layout: 'admin' });
    const { 
        $api_admin_counter_list, 
    } = useNuxtApp();

    const loader = ref(false);
    const admin_counter_list = useState('admin_counter_list', () => []);
    const loadCounterList = async () => {
        if (admin_counter_list.value.length > 0) return;
        loader.value = true;
        try{
            const getData = await $fetchAdmin($api_admin_counter_list, {
                method: 'GET',
            });
            admin_counter_list.value = getData.data;
        } catch(e){
            console.log('Get Message',e.message);
        } finally {
            loader.value = false;
        }
    }

    onMounted(() => {
        loadCounterList();
    });
</script>
<template>
    <div class="h-[calc(100vh-76px)]">
        <div class="flex flex-col justify-between h-full">
            <div class="flex h-full">
                <AdminLeftSide />
                <!-- Right Side -->
                <LoaderSpinkitBounceLoader v-if="loader" class="w-full"/>
                <div v-else class="px-6 py-2 flex flex-col justify-between h-full w-full overflow-auto">
                    <div class="mt-4 border border-gray-200 rounded-lg">
                        <div class="border-b border-gray-200">
                            <h4 class="text-[18px] font-semibold dark:text-gray-200 py-2 px-4">Counter List</h4>
                        </div>
                        <div class="p-4">
                            <div class="custom_table overflow-auto border-b border-gray-200">
                                <table class="table border table-auto">
                                    <thead class="sticky z-50 top-0">
                                        <tr>
                                            <!-- <th class="" width="10%">
                                                <div class="flex flex-row items-center justify-center gap-2">
                                                    <span>SL</span>
                                                </div>
                                            </th> -->
                                            <th class="sticky left-0" width="12%">
                                                <div class="flex flex-row items-center justify-center gap-2">
                                                    <span>Counter No.</span>
                                                </div>
                                            </th>
                                            <th width="25%">
                                                <div class="flex flex-row items-center justify-center gap-2">
                                                    <span>Counter Title</span>
                                                </div>
                                            </th>
                                            <th width="25%">
                                                <div class="flex flex-row items-center justify-center gap-2">
                                                    <span>Office Name</span>
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
                                        <tr v-for="(item, index) in admin_counter_list" :key="index">
                                            <!-- <td class="">
                                                <div class="flex justify-center items-center">{{ index+1 }}</div>
                                            </td> -->
                                            <td class="sticky left-0">
                                                <div class="flex justify-center items-center">
                                                    {{ item.counter_number }}
                                                </div>
                                            </td>
                                            <td>{{ item.title }}</td>
                                            <td>{{ item.office.office_name }}</td>
                                            <td>
                                                <div class="flex justify-center items-center gap-2">
                                                    <div class="rounded-full bg-white py-1.5 px-2 text-green-500 shadow-sm ring-1 ring-inset ring-gray-100 hover:bg-green-50 cursor-pointer flex justify-center items-cernter">
                                                        Edit
                                                    </div>
                                                    <div class="rounded-full bg-white py-1.5 px-2 text-red-500 shadow-sm ring-1 ring-inset ring-gray-100 hover:bg-red-50 cursor-pointer flex justify-center items-cernter">
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
</template>