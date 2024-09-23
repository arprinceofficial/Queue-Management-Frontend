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
	const { login } = officeAuth();
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

				<div class="flex items-center justify-center mt-6 lg:mt-16">
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
				</div>
			</form>
		</div>

		<img class="pt-4 lg:pt-6" src="/img/login-footer.png" alt="">
	</ClientOnly>
</template>
