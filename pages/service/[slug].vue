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
	// const queue_service = ref({});
	const queue_service = ref({
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
				"required": true,
				"id": 0,
				"value": ""
			},
			{
				"label": "Email",
				"name": "email",
				"type": "email",
				"place_holder": "i.e example@xyz.com",
				"required": true,
				"id": 1,
				"value": ""
			},
			{
				"label": "Mobile",
				"name": "mobile",
				"type": "number",
				"place_holder": "i.e +63-2-1234-5678",
				"required": false,
				"id": 2,
				"value": ""
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
				"required": true,
				"id": 3,
				"value": ""
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
				"required": true,
				"id": 4,
				"value": ""
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
						"name": "PWD/Pregnant/IP"
					}
				],
				"required": true,
				"id": 5,
				"value": ""
			}
		]
	});
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
			// queue_service.value = data[0];
        } catch(e){
            console.log('Get Message', e.message);
        } finally {
            loader.value = false;
        }
    }

    onMounted(async () => {
        // load_services();
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
	const generateToken = async () => {
		console.log(forms.value);
		// ++cur_step.value;
		// setTimeout(() => { router.push('/service'); }, 3000);

		is_submit_loading.value = true;
        try{
            // const getData = await $fetchOffice(`${$api_office_queue_vouchers_store}`, {
            //     method: 'POST',
			// 	body: forms.value
            // });
			// console.log(getData);
			// if(getData.status == true){
				++cur_step.value;
				setTimeout(() => { router.push('/service'); }, 3000);
			// }
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
	<div class="h-[calc(100vh-76px)]"> <!-- overflow-auto h-[calc(100vh-76px)] -->
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
					<div class="w-full flex sm:flex-nowrap flex-wrap justify-center mt-6 gap-6 pb-8">
						<ButtonPrimary 
							class="w-full h-[70px] text-[24px] px-[30px] py-[15px]" 
							@click="backPreview" 
							:disabled="is_submit_loading" 
							:class="[is_submit_loading ? 'bg-gray-300 text-[#4D5155] cursor-not-allowed hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-300' : '']"
						>{{ preview_mode ? 'Preview' : 'Back' }}</ButtonPrimary>

						<ButtonPrimary v-if="cur_step == 0" 
							class="w-full h-[70px] text-[24px] px-[30px] py-[15px]" 
							@click="nextPreview"
						>Next</ButtonPrimary>

						<ButtonPrimary v-else 
							class="w-full h-[70px] text-[24px] px-[30px] py-[15px]" 
							@click="generateToken" 
							:disabled="is_submit_loading" 
							:class="[is_submit_loading ? 'bg-gray-300 text-[#4D5155] cursor-not-allowed hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-300' : '']"
						>Generate Token</ButtonPrimary>
					</div>
				</div>
			</div>
		</div>
		<ServiceSuccess v-else-if="cur_step == 2" />
	</div>
</template>