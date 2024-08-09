<script setup>
    useHead({ title: 'Waiting Screen' });
    definePageMeta({ middleware: ['auth-office'] });
    const { 
        $api_office_queue_vouchers_waiting_screen,
    } = useNuxtApp();

    const waiting_list = useState('waiting_list', () => []);
    const loader = ref(true);
    const getWaitingList = async () => {
        loader.value = true;
        try {
            const getData = await $fetchOffice($api_office_queue_vouchers_waiting_screen, {
                method: 'POST',
            });
            waiting_list.value = getData;
        } catch (e) {
            console.log('Get Message', e.message);
        } finally {
            loader.value = false;
        }
    }

    onMounted(() => {
        getWaitingList();
    });

    const refreshWaitingList = async () => {
        try {
            const getData = await $fetchOffice($api_office_queue_vouchers_waiting_screen, {
                method: 'POST',
            });
            waiting_list.value = getData;
        } catch (e) {
            console.log('Get Message', e.message);
        }
    }
    setInterval(() => {
        refreshWaitingList();
    }, 5000);

    // const youtube_link = 'https://www.youtube.com/watch?v=6vlqPpMW1C0';
    // const yt_id = youtube_link.split('v=')[1];
    // const yt_embed_link = 'https://www.youtube.com/embed/' + yt_id;
    const yt_embed_link = (link) => {
        const yt_id = link.split('v=')[1];
        return 'https://www.youtube.com/embed/' + yt_id+'?autoplay=1&loop=1&playlist='+yt_id;
    }
    const { office_user } = officeAuth();
</script>
<template>
    <!-- <pre>{{ office_user.data.office }}</pre> -->
    <!-- {{ waiting_list.contentData[0].video_url }} -->
    <!-- <pre>{{ waiting_list }}</pre> -->
    <div class="h-screen flex flex-col items-center">
        <div class="bg-red-800 w-full" style="height: 120px; background: #0083C4; border-bottom-left-radius: 50px; padding: 10px 50px;">
            <h1 class="text-[20px] md:text-[40px] font-semibold text-white flex flex-col">
                <div class="flex items-center">
                    <span class="pr-4" style="color: #79FFFF;">AVP&nbsp;:&nbsp;</span>
                    <!-- Announcement of Leaps -->
                    <!-- <marquee class="text-white" behavior="scroll" direction="left" scrollamount="10" style="width: 100%;" onmouseover="this.stop();" onmouseout="this.start();">
                        <template v-for="(item, index) in news_items" :key="index" class="flex items-center">
                            <span class="truncate">{{ item.title }}</span>
                            <i class="fas fa-circle text-[#79FFFF] px-6 text-[20px]"></i>
                        </template>
                    </marquee> -->
                    <NuxtMarquee :speed="60" :direction="'left'" :behavior="'scroll'" class="flex items-center text-white cursor-pointer" style="width: 100%;" pauseOnHover>
                        <template v-for="(item, index) in waiting_list.announcementData" :key="index" class="flex items-center">
                            <span class="truncate">{{ item.title }}</span>
                            <i v-if="index != waiting_list.announcementData.length - 1" class="fas fa-circle text-[#79FFFF] px-6 text-[20px]"></i>
                        </template>
                    </NuxtMarquee>
                </div>
            </h1>

        </div>
        <div class="h-full w-full" style="background: #0083C4;">
            <div class="w-full flex flex-wrap flex items-center justify-center p-3 pt-6" style="height: 100%; background: #fff; border-top-right-radius: 50px;">
                <div class="md:w-1/3 w-full h-full p-4 rounded-md" style="background: linear-gradient(180deg, #FFF 0%, #C0E5D7 100%); border-radius: 10px 10px 30px 30px; border: 1px solid #eef2f4;">
                    <h1 class="text-[18px] md:text-[40px] font-semibold text-black">
                        <span class="rounded-[3px] mr-3 border-[3px]" style="border-radius: 3px; border: 3px solid #00B076;"></span>
                        Now Serving
                    </h1>
                    <div class="h-full w-full mt-3 p-4" style="overflow-y: auto; border-radius: 14px; background: #DFF1E9; height: calc(100vh - 230px);">
                        <LoaderSpinkitBounceLoader v-if="loader" class="w-full"/>
                        <div v-else>
                            <div v-for="(item, index) in waiting_list.servingData" :key="index" 
                                class="rounded-[3px] bg-[#FFF] border-[5px] border-y-0 border-[solid] border-[#00B076] mb-3 flex items-center justify-between" 
                                style="border-color: #00B076;">
                                <div class="p-2 text-white rounded-[2px]" style="font-size: 12px; background: #00B076; height: 80px;">
                                    <p class="flex items-center justify-center h-full font-semibold" style="rotate: 270deg;">Counter</p>
                                </div>
                                <div class="flex items-center justify-between w-full pl-3">
                                    <div class="p-2 w-[100px]" style="border-right: 2px solid #00B076; ">
                                        <h1 class="pr-2 text-[32px] font-semibold text-center" style="width: 60px;">{{ item.counter.counter_number }}</h1>
                                    </div>
                                    <div class="flex p-3 flex items-center justify-center gap-3">
                                        <p class="pr-2 text-[13px] md:text-[15px] font-semibold">Token No.</p>
                                        <div class="flex gap-3 text-[13px] md:text-[15px] font-semibold">
                                            <span class="text-[#0083C4] text-[30px]">{{ item.token }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="md:w-1/3 w-full h-full p-3 " >
                    <div class="h-full w-full flex items-center justify-center w-full" style="border-radius: 30px 30px 0px 0px; background: linear-gradient(180deg, #012A3F 2%, #FFF 100%);"> <!-- border-radius: 10px 10px 30px 30px; border-bottom: 1px solid #eef2f4; -->
                        <!-- add youtube video -->
                         <div v-if="waiting_list?.contentData && waiting_list.contentData.length > 0" class="w-full p-6" style="height: 70%;">
                             <iframe style="border-radius: 30px 30px 10px 10px;"
                                width="100%" 
                                height="100%" 
                                :src="yt_embed_link(waiting_list?.contentData[0].video_url)"
                                title="YouTube video player" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen
                                autoplay
                            >
                             </iframe>
                         </div>
                    </div>
                </div>
                <div class="md:w-1/3 w-full h-full p-4 rounded-md" style="background: linear-gradient(180deg, #FFF 0%, #F3ECDF 100%); border-radius: 10px 10px 30px 30px; border: 1px solid #eef2f4;">
                    <h1 class="text-[18px] text-black md:text-[40px] font-semibold">
                        <span class="rounded-[3px] mr-3 border-[3px]" style="border-radius: 3px; border: 3px solid #EC9C0E;"></span>
                        Now Pending
                    </h1>
                    <div class="h-full w-full mt-3 p-4" style="overflow-y: auto; border-radius: 14px; background: #FDF6E9; height: calc(100vh - 230px);">
                        <LoaderSpinkitBounceLoader v-if="loader" class="w-full"/>
                        <div v-else>
                            <div v-for="(item, index) in waiting_list.waitingData" :key="index" 
                                class="rounded-[3px] bg-[#FFF] border-[5px] border-y-0 border-[solid] border-[#EC9C0E] mb-3 flex items-center justify-between">
                                <div class="p-2 text-white rounded-[2px]" style="font-size: 12px; background: #EC9C0E; height: 80px;">
                                    <p class="flex items-center justify-center h-full font-semibold" style="rotate: 270deg;">Counter</p>
                                </div>
                                <div class="flex items-center justify-between w-full pl-3">
                                    <div class="p-2 w-[100px]" style="border-right: 2px solid #EC9C0E; ">
                                        <h1 class="pr-2 text-[32px] font-semibold text-center" style="width: 60px;">{{ item.counter.counter_number }}</h1>
                                    </div>
                                    <div class="flex p-3 flex items-center justify-center gap-3">
                                        <p class="pr-2 text-[13px] md:text-[15px] font-semibold">Token No.</p>
                                        <div class="flex gap-3 text-[13px] md:text-[15px] font-semibold">
                                            <span class="text-[#0083C4] text-[30px]">{{ item.token }}</span>
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

<style scoped>
    ::-webkit-scrollbar {
    width: 3px;
    /* margin: 10px; */
    }

    ::-webkit-scrollbar-thumb {
    background-color:  #c9c9c9;
    border-radius: 10px;
    /* margin: 10px; */
    }

    ::-webkit-scrollbar-track {
    background: #f6f6f6;
    margin: 20px 0;
    padding: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
    background: #c9c9c9;
    }
    .truncate {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>