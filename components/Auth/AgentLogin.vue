<script setup>
	import {
		LockClosedIcon,
		UserIcon
	} from "@heroicons/vue/24/outline"

	const password_open = ref(false)
	const password_view_status = (status) => {
		password_open.value = status
	}

	const form = reactive({
		loginInput: 'ashiqurr04@gmail.com',
		password: '12345678'
	});

	const unauthorizedError = ref('');
	const { login } = agentAuth();
	const isLoading = ref(false);

	const submit = async () => {
		isLoading.value = true;
		unauthorizedError.value = '';
		try {
			const response = await login(form);
			// console.log(response);
			if (response) {
				window.location.href = '/agent';
				return;
			}
		} catch (error) {
			unauthorizedError.value = error.data.message;
		}
		isLoading.value = false;
	}
</script>

<template>
	<ClientOnly>
		<div class="h-screen w-full flex flex-wrap flex items-center justify-center">
			<div class="relative md:w-1/3 w-full sm:pr-4 pr-3 pb-3 flex justify-center">
				<div class="absolute left-0 flex items-center h-full" >
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="347" viewBox="0 0 18 347" fill="none">
						<path d="M0.887451 0.700195L17.0125 11.4502V336.1L0.887451 346.85V0.700195Z" fill="#FCBD01"/>
					</svg>
				</div>
				<div class="p-5 sm:max-w-[500px] w-full">
					<div class="pl-8">
						<div>
							<div class="flex flex-col justify-center items-center">
								<!-- <NuxtLink to="/"> -->
								<ApplicationLogo :width="'280px'" :height="'100%'" />
								<!-- </NuxtLink> -->
								
							</div>
						</div>
						<form @submit.prevent="submit" class="mt-4 rounded-lg p-5 border-[2px] border-gray-200 dark:border-gray-700 ">
							<h2 class="mt-2 text-center text-[22px] font-bold tracking-tight text-gray-900 dark:text-gray-200">
								Queue Management</h2>
							<div class="mt-10">
								<InputLabel for="loginInput" value="User ID" class="text-[14px] mb-2" />
								<div class="relative mt-1">
									<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
										<UserIcon class="h-4 w-4 text-gray-400" aria-hidden="true" />
									</div>
									<InputText
										id="loginInput"
										type="text"
										class="pl-[10px] h-[40px] sm:text-sm text-[14px] pl-[40px]"
										v-model="form.loginInput"
										required
										autofocus
										autocomplete="loginInput" 
										placeholder="i.e. 2324I245986789"/>
								</div>
								<InputError class="mt-2" :message="unauthorizedError" />
							</div>
			
							<div class="mt-2">
								<InputLabel for="password" value="Password" class="text-[14px] mb-2" />
								<div class="relative mt-1">
									<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
										<LockClosedIcon class="h-4 w-4 text-gray-400 " aria-hidden="true" />
									</div>
									<InputText 
										id="password" 
										:type="password_open ? 'text' : 'password'"
										class="pl-[10px] h-[40px] sm:text-sm text-[14px] pl-[40px]"
										v-model="form.password" 
										required 
										autocomplete="current-password"
										placeholder="i.e. password#123" />
									<i :class="['absolute top-[14px] right-4 text-[14px] text-gray-600 fa cursor-pointer hidden', password_open ? 'fa-eye' : 'fa-eye-slash']"
										@click="password_view_status(!password_open)"></i>
								</div>
							</div>
			
							<div class="flex items-center justify-center mt-16">
								<ButtonPrimary class="w-[100%] h-[45px] text-[14px]" :class="{ 'opacity-25': isLoading }" :disabled="isLoading">
									Login
								</ButtonPrimary>
							</div>
						</form>
					</div>
				</div>
			</div>
	
			<div class="md:flex hidden md:w-2/3 w-full sm:h-full items-center justify-center p-5 bg-[#E6EEFF] ">
				<img class="w-full max-w-[80%]" src="/img/agent-login-image.png" alt="">
			</div>	
		</div>
	</ClientOnly>
</template>
