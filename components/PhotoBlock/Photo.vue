<script setup>
    import { ref} from 'vue'
    import PhotoPopupBlock from './popup/PhotoPopup'
    const emit = defineEmits(['set_photo'])
    const props = defineProps({
        getPhoto: String
    })
    const max_file_size = ref('2')
    const file_size_exceeded = ref(false)    
    const set_file_name = ref('')
    const file_type_invalid = ref(false)
    const Photo_popup_open = ref(false)
    const formData = ref({
        photo: ''
    })

    const Photo_popup_status_update = (status) => {
        Photo_popup_open.value = status
    }

    const get_file_name = (file) => {
        set_file_name.value = file.split('.').slice(0, -1).join('.')
    }
    
    const create_image = (value) => {        
        formData.value.photo = value
        emit('set_photo', value)
    }
</script>
<template>
    <div class="photo_upload_block">
        <div v-if="getPhoto" class="flex items-center justify-center photo_area">
            <img :src="getPhoto" />
        </div>
        <div v-else>
            <!-- <label for="photo" class="block text-sm font-medium text-gray-700">Photo</label> -->
            <div class="mt-1 flex items-center h-[140px]">
                <span class="h-20 w-20 overflow-hidden rounded-full bg-gray-100">
                    <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </span>
                <button type="button" class="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"  @click="Photo_popup_status_update(true)">Change</button>
            </div> 
        </div>

        <template v-if="getPhoto">
            <div class="flex items-center justify-center bg-green-600 text-white rounded-xl mt-3 gap-1 py-1 text-[11px] cursor-pointer" @click="Photo_popup_status_update(true)">
                <i class="fa fa-repeat"></i>
                <span>Change Photo</span>
            </div>
            <!-- <input type="file" ref="photo_input_form" class="hidden" @change="load_image" accept="image/jpg,image/jpeg,image/png" capture="environment" /> -->
        </template>
        <div v-if="file_size_exceeded" class="flex flex-row items-center gap-2 text-red-700 px-3 py-1 mt-2 bg-red-100 rounded-md err_msg">
            <i class="fa fa-check-circle"></i>
            <span>File size exceeded. Maxium allowed {{ max_file_size }} MB</span>
        </div>
        <div v-else-if="file_type_invalid" class="flex flex-row items-center gap-2 text-red-700 px-3 py-1 mt-2 bg-red-100 rounded-md err_msg">
            <i class="fa fa-check-circle"></i>
            <span>Only allowed JPG, JPEG, PNG</span>
        </div>
        <div v-else class="my-2" align="center">
            <p>JPG, JPEG, PNG up to {{ max_file_size }} MB</p>
        </div>
        <PhotoPopupBlock v-if="Photo_popup_open" @PhotoPopupStatusUpdate="Photo_popup_status_update" @createImage="create_image" />
    </div>
</template>
<style lang="scss" scoped>
.photo_upload_block{
    & > .photo_area{
        position: relative;
        width: 175px; height: 175px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 50%;
        cursor: pointer;

        & > .change_photo_btn,
        & > .preloader{
            position: absolute;
            display: none;
            font-size: 8px;
            background-color: #16a34a;
            color: #fff;
            border-radius: 25px;
            padding: 2px 5px;
            z-index: 1;

            &.preloader{
                display: flex;
            }
        }            

        & > i{
            font-size: 48px;
            color: #bac6bd;
        }

        & > img{
            width: 100%; height: 100%;
            border-radius: 50%;
            object-fit: cover;
        }

        &:hover{
            & > .change_photo_btn{
                display: flex;
            }
        }
    }
}
</style>