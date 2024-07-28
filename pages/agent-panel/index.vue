<script setup>
	useHead({ title: 'Home' });
	definePageMeta({ middleware: ['auth-agent'], layout: 'agent' });

    const waiting_list = ref([
        {
            token_no: 'A-013',
            service_name: 'Inquiry',
            token_generated: '28 Nov, 2023'
        },
        {
            token_no: 'A-014',
            service_name: 'Avail Service',
            token_generated: '28 Nov, 2023'
        },
        {
            token_no: 'A-015',
            service_name: 'Complaint',
            token_generated: '28 Nov, 2023'
        }
    ]);
</script>

<template>
    <div class="min-h-[calc(100vh-75px)] flex flex-col justify-between items-center py-[10px]">
        <div class="h-full md:h-[calc(100vh-95px)] w-full px-3 flex flex-wrap flex items-center justify-center">
            <div class="md:w-1/2 w-full h-full flex justify-center bg-[#DFEFE8]">
                <div class="p-2 w-full flex flex-col items-center justify-between">
                    <div class="flex flex-col items-center overflow-auto w-full">
                        <p class="text-[18px] sm:text-[20px] md:text-[30px] 2xl:text-[40px] text-[#00B076] text-center font-semibold">
                            Currently Serving
                        </p>
                        <h1 class="text-[28px] sm:text-[35px] md:text-[45px] 2xl:text-[70px] text-black font-semibold">
                            Token Number
                        </h1>
                        <div class="w-[130px] sm:w-[230px] md:w-[350px] 2xl:w-[460px] h-[70px] sm:h-[100px] md:h-[150px] 2xl:h-[200px] rounded-[20px] border-[2px] md:border-[4px] 2xl:border-[4px] border-[solid] border-[#0083C4] bg-[#FFF] flex items-center justify-center mt-3">
                            <h1 class="text-[30px] sm:text-[60px] md:text-[80px] 2xl:text-[120px] text-[#0083C4] text-center not-italic font-semibold leading-[normal]">
                                B-012
                            </h1>
                        </div>
                        <div class="flex flex-col items-center mt-3">
                            <p class="text-[14px] sm:text-[15px] md:text-[20px] 2xl:text-[30px] font-semibold">Serving Time</p>
                            <p class="text-[25px] sm:text-[30px] md:text-[40px] 2xl:text-[70px] font-semibold">00:45:13</p>
                        </div>
                    </div>

                    <div class="py-3 w-full">
                        <div class="w-full flex justify-center items-center">
                            <div class="w-[90%] md:h-[100px] lg:h-[120px] bg-[#FFF] [box-shadow:0px_4.3px_10.75px_0px_rgba(0,_0,_0,_0.05)] rounded-lg p-2 bg-[#F9F9F9]">
                                <div class="h-full flex flex-wrap flex items-center justify-center">
                                    <ButtonSecondary :name="'Start'" :border="true"/>
                                    <ButtonSecondary :name="'Close'" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="md:w-1/2 w-full h-full overflow-auto flex justify-center ">
                <div class="pt-2 md:p-2 md:py-0 w-full flex flex-col items-center justify-between">
                    <div class="w-full px-5 py-[12px] bg-[#F2E5C5]">
                        <p class="text-[20px] md:text-[25px] 2xl:text-[30px] font-semibold">
                            Waiting
                        </p>
                    </div>
                    <div class="h-full w-full p-3 overflow-auto bg-[#FBF7F1] sm:max-h-[calc(100vh-95px)] md:max-h-[calc(100vh-95px)] 2xl:max-h-[calc(100vh-95px)]">
                        <AgentWaitingList :data="waiting_list" />
                    </div>

                    <div class="pt-3 w-full">
                        <div class="w-full flex justify-center items-center bg-[#BBEAD6] [box-shadow:0px_4.3px_10.75px_0px_rgba(0,_0,_0,_0.05)] rounded-lg">
                            <div class="w-[90%] md:h-[100px] lg:h-[120px] p-2">
                                <div class="h-full flex flex-wrap flex items-center justify-center">
                                    <ButtonSecondary :name="'Next'" :border="true"/>
                                    <ButtonSecondary :name="'Transfer'" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>