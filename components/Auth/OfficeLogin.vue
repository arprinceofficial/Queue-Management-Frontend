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
		loginInput: '',
		password: ''
	});

	const unauthorizedError = ref('');
	const { login, officeLoginGoogle } = officeAuth();
	const isLoading = ref(false);

	const submit = async () => {
		isLoading.value = true;
		unauthorizedError.value = '';
		try {
			const response = await login(form);
			// console.log(response);
			if (response) {
				window.location.href = '/home';
				return;
			}
		} catch (error) {
			unauthorizedError.value = error.data.message;
		} finally {
			isLoading.value = false;
		}
	}
	const handleGoogleLogin = async () => {
		isLoading.value = true;
		unauthorizedError.value = '';
		try {
			const response = await officeLoginGoogle();
			// console.log(response);
			if (response) {
				window.location.href = '/home';
				return;
			}
		} catch (error) {
			unauthorizedError.value = error.data.message;
		} finally {
			isLoading.value = false;
		}
	}
</script>

<template>
	<ClientOnly>
		<div class="mt-5 lg:mt-24">
			<div>
				<div class="flex flex-col justify-center items-center">
					<!-- <NuxtLink to="/"> -->
					<ApplicationLogo class="w-[80px] lg:w-[204px]"  />
					<!-- </NuxtLink> -->
					<h2 class="mt-2 lg:mt-6 text-center text-[32px] lg:text-[64px] font-bold tracking-tight text-gray-900 dark:text-gray-200 mt-[10px] lg:mt-[80px]">
						Login</h2>
				</div>
			</div>
			<form @submit.prevent="submit" class="lg:mt-24 px-5">
				<div>
					<InputLabel for="loginInput" value="User ID" class="text-[14px] lg:text-[25px] mb-2 lg:mb-6" />
					<div class="relative mt-1">
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 lg:pl-8">
							<UserIcon class="h-4 w-4 lg:h-8 lg:w-8 text-gray-400" aria-hidden="true" />
						</div>
						<InputText
							id="loginInput"
							type="text"
							class="pl-[40px] lg:pl-[80px] h-[36px] lg:h-[72px] sm:text-sm lg:text-[20px] rounded-[50px]"
							v-model="form.loginInput"
							required
							autofocus
							autocomplete="loginInput" 
							placeholder="i.e. 2324I245986789"/>
					</div>
					<InputError class="mt-2" :message="unauthorizedError" />
				</div>

				<div class="mt-3 lg:mt-10">
					<InputLabel for="password" value="Password" class="text-[14px] lg:text-[25px] mb-2 lg:mb-6" />
					<div class="relative mt-1">
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 lg:pl-8">
							<LockClosedIcon class="h-4 w-4 lg:h-8 lg:w-8 text-gray-400 " aria-hidden="true" />
						</div>
						<InputText 
							id="password" 
							:type="password_open ? 'text' : 'password'"
							class="pl-[40px] lg:pl-[80px] h-[36px] lg:h-[72px] sm:text-sm lg:text-[20px] rounded-[50px]"
							v-model="form.password" 
							required 
							autocomplete="current-password"
							placeholder="i.e. password#123" />
						<i :class="['absolute top-[11px] lg:top-[25px] right-4 lg:right-10 text-[14px] lg:text-[24px] text-gray-600 fa cursor-pointer hidden', password_open ? 'fa-eye' : 'fa-eye-slash']"
							@click="password_view_status(!password_open)"></i>
					</div>
				</div>

				<div class="flex items-center justify-center mt-6 lg:mt-16 flex-col gap-5">
					<ButtonPrimary class="lg:w-[618px] h-[45px] lg:h-[85px] text-[18px] lg:text-[32px] px-[53px] py-[17px] gap-[10px]" :class="{ 'opacity-25': isLoading }" :disabled="isLoading">
						<span v-if="!isLoading">Login</span>
						<svg v-else class="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
							width="40" height="40">
							<path
								d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
								stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
							<path
								d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
								stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"
								class="text-green-500"></path>
						</svg>
					</ButtonPrimary>
					<div @click="handleGoogleLogin" class="lg:w-[618px] h-[45px] lg:h-[85px] text-[18px] lg:text-[32px] px-[53px] py-[17px] gap-[10px] bg-gray-100 rounded-[50px] cursor-pointer flex items-center justify-center" :class="{ 'opacity-25': isLoading }" :disabled="isLoading">
						<span v-if="!isLoading" class="flex items-center justify-center h-full">
							<svg width="22" height="22" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M23.764 10.792H14.5375C14.1306 10.792 13.8013 11.1213 13.8013 11.5282V14.4778C13.8013 14.8846 14.1306 15.214 14.5375 15.214H19.7344C19.1677 16.6912 18.1021 17.9262 16.7509 18.7108L18.9643 22.5468C22.5144 20.4932 24.6164 16.8849 24.6164 12.8504C24.6164 12.2741 24.5728 11.8624 24.4905 11.4023C24.4227 11.0487 24.1176 10.792 23.764 10.792Z" fill="#167EE6"></path>
								<path d="M13.3072 19.6408C10.7644 19.6408 8.54618 18.2507 7.35472 16.1971L3.5188 18.4057C5.47066 21.7912 9.12738 24.0676 13.3072 24.0676C15.3607 24.0676 17.2932 23.5154 18.9642 22.5516V22.5468L16.7508 18.7108C15.7337 19.3017 14.5616 19.6408 13.3072 19.6408Z" fill="#12B347"></path>
								<path d="M18.9593 22.5516V22.5467L16.7459 18.7108C15.7336 19.2969 14.5616 19.6407 13.3071 19.6407V24.0675C15.3607 24.0675 17.2932 23.5154 18.9593 22.5516Z" fill="#0F993E"></path>
								<path d="M6.42485 12.7584C6.42485 11.504 6.76873 10.3319 7.35477 9.31964L3.51885 7.11108C2.55019 8.77235 1.99805 10.7 1.99805 12.7584C1.99805 14.8168 2.55019 16.7445 3.51885 18.4057L7.35477 16.1972C6.76389 15.1849 6.42485 14.0128 6.42485 12.7584Z" fill="#FFD500"></path>
								<path d="M13.3072 5.87602C14.9636 5.87602 16.4892 6.46691 17.6759 7.44526C17.9713 7.68743 18.3975 7.66806 18.6639 7.40167L20.7514 5.3142C21.0565 5.00907 21.0323 4.5102 20.7078 4.22929C18.7172 2.49538 16.126 1.44922 13.3072 1.44922C9.12738 1.44922 5.47066 3.72558 3.5188 7.11107L7.35472 9.31963C8.54618 7.26606 10.7644 5.87602 13.3072 5.87602Z" fill="#FF4B26"></path>
								<path d="M17.6758 7.44526C17.9713 7.68743 18.3975 7.66806 18.6639 7.40167L20.7513 5.3142C21.0565 5.00907 21.0322 4.5102 20.7077 4.22929C18.7171 2.49538 16.1259 1.44922 13.3071 1.44922V5.87602C14.9635 5.87602 16.4892 6.46207 17.6758 7.44526Z" fill="#D93F21"></path>
							</svg>
						</span>
						<svg v-else class="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
							width="40" height="40">
							<path
								d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
								stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
							<path
								d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
								stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"
								class="text-green-500"></path>
						</svg>
					</div>
				</div>
			</form>
		</div>

		<img class="pt-4 lg:pt-6" src="/img/login-footer.png" alt="">
	</ClientOnly>
</template>
