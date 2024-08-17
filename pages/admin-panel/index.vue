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

                <div class="px-6 py-2 flex flex-col justify-between h-full w-full overflow-auto">
                    <div>
                        <div>
                            <div class="mt-6">
                                <div class="flex"><label
                                        class="block font-medium text-gray-700 dark:text-gray-300 text-[25px] mb-1"><span>Name</span></label><span
                                        class="text-red-500 text-[25px] pl-2">*</span></div>
                                <div class="flex"><input
                                        class="flex w-full focus:border-green-500 focus:ring-green-500 mt-1 items-center border-[1px] border-[solid] border-gray-300 [box-shadow:0px_1px_3px_0px_rgba(0,_0,_0,_0.05)] h-[72px] sm:text-xl text-[20px] rounded-lg"
                                        type="text" placeholder="i.e John doe" value=""></div>
                                <div class="mt-2" style="display: none;">
                                    <p class="text-red-600 dark:text-red-400 text-xl"></p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="mt-6">
                                <div class="flex"><label
                                        class="block font-medium text-gray-700 dark:text-gray-300 text-[25px] mb-1"><span>Email</span></label><span
                                        class="text-red-500 text-[25px] pl-2">*</span></div>
                                <div class="flex"><input
                                        class="flex w-full focus:border-green-500 focus:ring-green-500 mt-1 items-center border-[1px] border-[solid] border-gray-300 [box-shadow:0px_1px_3px_0px_rgba(0,_0,_0,_0.05)] h-[72px] sm:text-xl text-[20px] rounded-lg"
                                        type="email" placeholder="i.e example@xyz.com" value=""></div>
                                <div class="mt-2" style="display: none;">
                                    <p class="text-red-600 dark:text-red-400 text-xl"></p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="mt-6">
                                <div class="flex"><label
                                        class="block font-medium text-gray-700 dark:text-gray-300 text-[25px] mb-1"><span>Mobile</span></label><span
                                        class="text-red-500 text-[25px] pl-2">*</span></div>
                                <div class="flex"><span
                                        class="flex items-center h-[72px] sm:text-xl text-[20px] rounded-lg px-3 mr-3 mt-1 border-[2px] border-green-500 rounded-lg"></span><input
                                        class="flex w-full focus:border-green-500 focus:ring-green-500 mt-1 items-center border-[1px] border-[solid] border-gray-300 [box-shadow:0px_1px_3px_0px_rgba(0,_0,_0,_0.05)] h-[72px] sm:text-xl text-[20px] rounded-lg [appearance:textfield] [&amp;::-webkit-outer-spin-button]:appearance-none [&amp;::-webkit-inner-spin-button]:appearance-none"
                                        type="number" placeholder="i.e +63-2-1234-5678" value=""></div>
                                <div class="mt-2" style="display: none;">
                                    <p class="text-red-600 dark:text-red-400 text-xl"></p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="mt-6">
                                <div class="flex"><label
                                        class="block font-medium text-gray-700 dark:text-gray-300 text-[25px] mb-1"><span>Gender</span></label><span
                                        class="text-red-500 text-[25px] pl-2">*</span></div>
                                <div class="flex flex-wrap gap-3 mt-3">
                                    <div
                                        class="rounded-[25px] inline-flex items-center border border-[#ddddd] px-5 py-2 text-base font-medium transition shadow-sm hover:border-[#009A67] focus:outline-none outline-none cursor-pointer">
                                        Male</div>
                                    <div
                                        class="rounded-[25px] inline-flex items-center border border-[#ddddd] px-5 py-2 text-base font-medium transition shadow-sm hover:border-[#009A67] focus:outline-none outline-none cursor-pointer">
                                        Female</div>
                                </div>
                                <div class="mt-2" style="display: none;">
                                    <p class="text-red-600 dark:text-red-400 text-xl"></p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="mt-6">
                                <div class="flex"><label
                                        class="block font-medium text-gray-700 dark:text-gray-300 text-[25px] mb-1"><span>Service</span></label><span
                                        class="text-red-500 text-[25px] pl-2">*</span></div>
                                <div class="flex flex-wrap gap-3 mt-3">
                                    <div
                                        class="rounded-[25px] inline-flex items-center border border-[#ddddd] px-5 py-2 text-base font-medium transition shadow-sm hover:border-[#009A67] focus:outline-none outline-none cursor-pointer">
                                        Grievance Redress Service</div>
                                    <div
                                        class="rounded-[25px] inline-flex items-center border border-[#ddddd] px-5 py-2 text-base font-medium transition shadow-sm hover:border-[#009A67] focus:outline-none outline-none cursor-pointer">
                                        Certificate of Live Birth (COLB)</div>
                                    <div
                                        class="rounded-[25px] inline-flex items-center border border-[#ddddd] px-5 py-2 text-base font-medium transition shadow-sm hover:border-[#009A67] focus:outline-none outline-none cursor-pointer">
                                        Business Permit Registration and Renewal</div>
                                </div>
                                <div class="mt-2" style="display: none;">
                                    <p class="text-red-600 dark:text-red-400 text-xl"></p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="mt-6">
                                <div class="flex"><label
                                        class="block font-medium text-gray-700 dark:text-gray-300 text-[25px] mb-1"><span>Priority
                                            lane</span></label><span class="text-red-500 text-[25px] pl-2">*</span>
                                </div>
                                <div class="flex flex-wrap gap-3 mt-3">
                                    <div
                                        class="rounded-[25px] inline-flex items-center border border-[#ddddd] px-5 py-2 text-base font-medium transition shadow-sm hover:border-[#009A67] focus:outline-none outline-none cursor-pointer">
                                        Regular</div>
                                    <div
                                        class="rounded-[25px] inline-flex items-center border border-[#ddddd] px-5 py-2 text-base font-medium transition shadow-sm hover:border-[#009A67] focus:outline-none outline-none cursor-pointer">
                                        PWD/Pregnant/IP</div>
                                </div>
                                <div class="mt-2" style="display: none;">
                                    <p class="text-red-600 dark:text-red-400 text-xl"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full flex sm:flex-nowrap flex-wrap justify-center mt-6 gap-6 pb-8"><button
                            class="flex items-center px-4 py-2 bg-[#00B076] border border-transparent font-semibold text-white uppercase tracking-widest hover:bg-[#00B076] focus:bg-[#00B076] active:bg-[#00B076] focus:outline-none focus:ring-2 focus:ring-[#00B076] focus:ring-offset-2 transition ease-in-out duration-150 justify-center items-center rounded-[64px] bg-[#00B076] w-full h-[70px] text-[24px] px-[30px] py-[15px]">Back</button><button
                            class="flex items-center px-4 py-2 bg-[#00B076] border border-transparent font-semibold text-white uppercase tracking-widest hover:bg-[#00B076] focus:bg-[#00B076] active:bg-[#00B076] focus:outline-none focus:ring-2 focus:ring-[#00B076] focus:ring-offset-2 transition ease-in-out duration-150 justify-center items-center rounded-[64px] bg-[#00B076] w-full h-[70px] text-[24px] px-[30px] py-[15px]">Next</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>