<script setup>
	useHead({ title: 'Home' });
	definePageMeta({ middleware: ['auth-agent'], layout: 'agent' });
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
                    <!-- button -->
                    <div class="py-3 w-full">
                        <div class="w-full flex justify-center items-center">
                            <div class="w-[90%] md:h-[100px] lg:h-[120px] bg-[#FFF] [box-shadow:0px_4.3px_10.75px_0px_rgba(0,_0,_0,_0.05)] rounded-lg p-2 bg-[#F9F9F9]">
                                <div class="h-full flex flex-wrap flex items-center justify-center">
                                    <div class="md:w-1/2 w-full h-full flex justify-center">
                                        <div class="m-2 w-full flex items-center justify-center">
                                           <button class="rounded-xl bg-[#125374] max-w-[325px] w-full max-h-[130px] p-1 h-full text-white font-semibold text-[14px] text-[20px] md:text-[25px] 2xl:text-[30px]">
                                                <div class="w-full h-full p-2 flex justify-between items-center rounded-xl rounded-[20px] border-[2px] border-[solid] border-[rgba(255,255,255,0.81)]">
                                                    <span class="w-[5px] h-full bg-[#FFF] rounded-xl"></span>
                                                    Start
                                                    <span class="w-[5px] h-full bg-[#FFF] rounded-xl"></span>
                                                </div>
                                           </button>
                                        </div>
                                    </div>
                                    <div class="md:w-1/2 w-full h-full flex justify-center">
                                        <div class="m-2 w-full flex items-center justify-center">
                                            <button class="rounded-xl bg-[#125374] max-w-[325px] w-full max-h-[130px] p-1  h-full text-white font-semibold text-[14px] text-[20px] md:text-[25px] 2xl:text-[30px]">
                                                <div class="w-full h-full flex justify-center items-center rounded-xl rounded-[20px] border-[2px] border-[solid] border-[rgba(255,255,255,0.81)]">
                                                    Close
                                                </div>
                                           </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="md:w-1/2 w-full h-full overflow-auto flex justify-center ">
                <div class="sm:pt-2 md:p-2 md:py-0 w-full flex flex-col items-center justify-between">
                    <div class="w-full px-5 py-[12px] bg-[#F2E5C5]">
                        <p class="text-[20px] md:text-[25px] 2xl:text-[30px] font-semibold">
                            Waiting
                        </p>
                    </div>
                    <div class="h-full w-full p-3 overflow-auto bg-[#FBF7F1] sm:max-h-[calc(100vh-95px)] md:max-h-[calc(100vh-95px)] 2xl:max-h-[calc(100vh-95px)]">
                        <div v-for="item in 100" 
                            class="p-3 rounded-[3px] bg-[#FFF] border-[5px] border-y-0 border-[solid] border-[#EC9C0E] mb-3 flex items-center justify-between">
                            <div class="flex">
                                <p class="pr-5 text-[13px] md:text-[15px] 2xl:text-[20px] font-semibold">Token No : A-013</p>
                                <div class="flex gap-3 text-[13px] md:text-[15px] 2xl:text-[20px] font-semibold">
                                    <p>Services : <span class="text-[#EC9C0E]">Inquiry</span></p>
                                </div>
                            </div>
                            <p class="text-[10px] md:text-[13px] 2xl:text-[17px] text-[#535353]">Token Generated on 28 Nov, 2023</p>
                        </div>
                    </div>
                    <!-- button -->
                    <div class="pt-3 w-full">
                        <div class="w-full flex justify-center items-center bg-[#BBEAD6] [box-shadow:0px_4.3px_10.75px_0px_rgba(0,_0,_0,_0.05)] rounded-lg">
                            <div class="w-[90%] md:h-[100px] lg:h-[120px] p-2">
                                <div class="h-full flex flex-wrap flex items-center justify-center">
                                    <div class="md:w-1/2 w-full h-full flex justify-center">
                                        <div class="m-2 w-full flex items-center justify-center">
                                           <button class="rounded-xl bg-[#125374] max-w-[325px] w-full max-h-[130px] p-1 h-full text-white font-semibold text-[14px] text-[20px] md:text-[25px] 2xl:text-[30px]">
                                                <div class="w-full h-full p-2 flex justify-between items-center rounded-xl rounded-[20px] border-[2px] border-[solid] border-[rgba(255,255,255,0.81)]">
                                                    <span class="w-[5px] h-full bg-[#FFF] rounded-xl"></span>
                                                    Next
                                                    <span class="w-[5px] h-full bg-[#FFF] rounded-xl"></span>
                                                </div>
                                           </button>
                                        </div>
                                    </div>
                                    <div class="md:w-1/2 w-full h-full flex justify-center">
                                        <div class="m-2 w-full flex items-center justify-center">
                                            <button class="rounded-xl bg-[#125374] max-w-[325px] w-full max-h-[130px] p-1  h-full text-white font-semibold text-[14px] text-[20px] md:text-[25px] 2xl:text-[30px]">
                                                <div class="w-full h-full flex justify-center items-center rounded-xl rounded-[20px] border-[2px] border-[solid] border-[rgba(255,255,255,0.81)]">
                                                    Transfer
                                                </div>
                                           </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>