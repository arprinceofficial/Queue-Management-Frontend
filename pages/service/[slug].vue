<script setup>
	definePageMeta({ middleware: ['auth-office'], layout: 'office' });
	import SelectButton from './Forms/SelectButton.vue';
	import TextInputBlock from './Forms/TextInput.vue';
	const { $api_office_queue_services, $api_office_queue_vouchers_store } = useNuxtApp();
	const { office_user } = officeAuth();
	const route = useRoute();
	const current_slug = computed( () => route.params.slug );
    const current_route = computed( () => route.name );
	const current_path = computed( () => route.path );

	useHead({
		title: current_slug.value
		.split('-')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
	});
	
	const queue_service = ref({});
	const loader = ref(false);
    const load_services = async () => {
		loader.value = true;
        try{
            const getData = await $fetchOffice(`${$api_office_queue_services}/${current_slug.value}`, {
                method: 'POST',
            });
            let data = getData.data.fields.map((item, index) => {
				item.id = index;
				item.value = '';
				return getData.data;
			});
			queue_service.value = data[0];
        } catch(e){
            console.log('Get Message', e.message);
        } finally {
            loader.value = false;
        }
    }

    onMounted(async () => {
        load_services();
    });

	const updateForm = (data) => {
		// console.log(queue_service.value.fields);
		const index = queue_service.value.fields.findIndex(item => item.id == data.id);
		queue_service.value.fields[index] = data;
	}
	const forms = ref({});
	const validations_errors = ref({});
	const preview_mode = ref(false);
	const cur_step = ref(0);
	const nextPreview = () => {
		validations_errors.value = {};
		// Check validations
		const errors = queue_service.value.fields.filter(item => item.required && !item.value);
		if(errors.length > 0){
			errors.map(item => {
				validations_errors.value[item.name] = `${item.label} is required`;
			});
			return;
		}
		
		queue_service.value.fields.map(item => {
			forms.value[item.name] = item.value;
			// Set mobile number with country code
			// if(item.name == 'mobile'){
			// 	forms.value[item.name] = office_user.value.country_code + item.value;
			// }
		});
		forms.value.service_id = queue_service.value.id;
		preview_mode.value = true;
		++cur_step.value;
	}
	const router = useRouter();
	const backPreview = () => {
		if (preview_mode.value) {
			preview_mode.value = false;
			--cur_step.value;
		} else {
			// router.back();
			router.push('/service');
		}
	}

	const is_submit_loading = ref(false);
	const token_generated = ref({});
	const generateToken = async () => {
		// console.log(forms.value);
		// ++cur_step.value;
		// setTimeout(() => { router.push('/service'); }, 3000);

		is_submit_loading.value = true;
        try{
            const getData = await $fetchOffice(`${$api_office_queue_vouchers_store}`, {
                method: 'POST',
				body: forms.value
            });
			console.log(getData);
			if(getData.status == true){
				token_generated.value = getData.data;
				// ++cur_step.value;
				// setTimeout(() => { router.push('/service'); }, 3000);
				router.push('/service/success' + '?token=' + getData.data.token);
			}
        } catch(e){
            console.log('Get Message', e.message);
        } finally {
            is_submit_loading.value = false;
        }
	}
</script>
<template>
	<!-- {{ cur_step }} -->
	<!-- <pre>{{ forms }}</pre> -->
	<!-- {{ current_route }} <br> {{ current_slug }} <br> {{ current_path }} <br> -->
	<!-- <pre>{{ queue_service }}</pre> -->
	<div class="h-[calc(100vh-60px)] lg:h-[calc(100vh-76px)]"> <!-- overflow-auto h-[calc(100vh-76px)] -->
		<div v-if="cur_step < 2" class="flex flex-col justify-between h-full">
			<div class="flex h-full">
				<ServiceLeftSide :queue_service="queue_service" />
				<LoaderSpinkitBounceLoader v-if="loader" class="w-full"/>
				<div v-else class="px-6 py-2 flex flex-col justify-between h-full w-full overflow-auto">
					<div>
						<template v-for="(item, index) in queue_service.fields" :key="index">
							<div>
								<TextInputBlock v-if="item.type == 'text' || item.type=='number' || item.type=='email'"
									:data="item"
									:preview_mode="preview_mode"
									:error="validations_errors[item.name]"
									@update_form="updateForm"
								/>
								<SelectButton v-if="item.type =='radio'"
									:data="item"
									:preview_mode="preview_mode"
									:error="validations_errors[item.name]"
									@update_form="updateForm" />
							</div>
						</template>
					</div>
					<div class="w-full flex sm:flex-nowrap sm:flex-wrap justify-center mt-3 lg:mt-6 gap-3 lg:gap-6 pb-4 lg:pb-8">
						<ButtonPrimary 
							class="w-full h-[35px] lg:h-[70px] text-[14px] px-[8px] lg:px-[15px] py-[3px] lg:py-[8px] lg:text-[24px] lg:px-[30px] lg:py-[15px]" 
							@click="backPreview" 
							:disabled="is_submit_loading" 
							:class="[is_submit_loading ? 'bg-gray-300 text-[#4D5155] cursor-not-allowed hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-300' : '']"
						>{{ preview_mode ? 'Edit' : 'Back' }}</ButtonPrimary>

						<ButtonPrimary v-if="cur_step == 0" 
							class="w-full h-[35px] lg:h-[70px] text-[14px] px-[8px] lg:px-[15px] py-[3px] lg:py-[8px] lg:text-[24px] lg:px-[30px] lg:py-[15px]" 
							@click="nextPreview"
						>Next</ButtonPrimary>

						<ButtonPrimary v-else 
							id="generate-token"
							class="w-full h-[35px] lg:h-[70px] text-[14px] px-[8px] lg:px-[15px] py-[3px] lg:py-[8px] lg:text-[24px] lg:px-[30px] lg:py-[15px]" 
							@click="generateToken" 
							:disabled="is_submit_loading" 
							:class="[is_submit_loading ? 'bg-gray-300 text-[#4D5155] cursor-not-allowed hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-300' : '']"
						>Generate Token</ButtonPrimary>
					</div>
				</div>
			</div>
		</div>
		<ServiceSuccessV2 v-else-if="cur_step == 2" :data="token_generated" />
	</div>
</template>