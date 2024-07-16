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
				window.location.href = '/customer';
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
		<div class="mt-24">
			<div>
				<div class="flex flex-col justify-center items-center">
					<!-- <NuxtLink to="/"> -->
					<ApplicationLogo :width="'404px'" :height="'121px'" />
					<!-- </NuxtLink> -->
					<h2 class="mt-6 text-center text-[64px] font-bold tracking-tight text-gray-900 dark:text-gray-200 mt-[80px]">
						Login</h2>
				</div>
			</div>
			<form @submit.prevent="submit" class="mt-24">
				<div class="mt-10">
					<InputLabel for="loginInput" value="User ID" class="text-[25px] mb-6" />
					<div class="relative mt-1">
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-8">
							<UserIcon class="h-8 w-8 text-gray-400" aria-hidden="true" />
						</div>
						<InputText
							id="loginInput"
							type="text"
							class="pl-[80px]"
							v-model="form.loginInput"
							required
							autofocus
							autocomplete="loginInput" 
							placeholder="i.e. 2324I245986789"/>
					</div>
					<InputError class="mt-2" :message="unauthorizedError" />
				</div>

				<div class="mt-10">
					<InputLabel for="password" value="Password" class="text-[25px] mb-6" />
					<div class="relative mt-1">
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-8">
							<LockClosedIcon class="h-8 w-8 text-gray-400 " aria-hidden="true" />
						</div>
						<InputText 
							id="password" 
							:type="password_open ? 'text' : 'password'"
							class="pl-[80px]"
							v-model="form.password" 
							required 
							autocomplete="current-password"
							placeholder="i.e. password#123" />
						<i :class="['absolute top-[25px] right-10 text-[24px] text-gray-600 fa cursor-pointer hidden', password_open ? 'fa-eye' : 'fa-eye-slash']"
							@click="password_view_status(!password_open)"></i>
					</div>
				</div>

				<div class="flex items-center justify-center mt-16">
					<ButtonPrimary class="w-[618px]" :class="{ 'opacity-25': isLoading }" :disabled="isLoading">
						Login
					</ButtonPrimary>
				</div>
			</form>
		</div>

		<img class="pt-10" src="/img/login-footer.png" alt="">
	</ClientOnly>
</template>
