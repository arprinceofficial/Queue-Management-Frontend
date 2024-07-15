<script setup>
	useHead({ title: 'Login' });
	import {
		LockClosedIcon
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
	const { login } = useAuth();
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
					<h2 class="mt-6 text-center text-[64px] font-bold tracking-tight text-gray-900 dark:text-gray-200 mt-[80px]">Login</h2>
				</div>
			</div>
			<form @submit.prevent="submit" class="mt-24">
				<div class="mt-10">
					<InputLabel for="loginInput" value="User ID" class="text-[25px] mb-6" />
	
					<TextInput
						id="loginInput"
						type="text"
						class="mt-1 block text-[20px] flex h-[72.928px] pt-[16.346px] pr-[22.286px] pb-[15.428px] pl-[47.78px] items-center flex-shrink-0 self-stretch rounded-[50.295px] border-[1.714px] border-[solid] border-[var(--gray-300,#D1D5DB)] bg-[var(--white,_#FFF)] [box-shadow:0px_1.714px_3.429px_0px_rgba(0,_0,_0,_0.05)]"
						v-model="form.loginInput"
						required
						autofocus
						autocomplete="loginInput" 
						placeholder="i.e. 2324I245986789"/>
	
					<InputError class="mt-2" :message="unauthorizedError" />
				</div>
	
				<div class="mt-10">
					<InputLabel for="password" value="Password" class="text-[25px] mb-6"/>
					<div class="relative mt-1">
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-8">
							<LockClosedIcon class="h-8 w-8 text-gray-400 " aria-hidden="true" />
						</div>
						<TextInput 
							id="password"
							:type="password_open ? 'text' : 'password'"
							class="text-[20px] pl-[80px] mt-1 block h-[72.928px] pt-[16.346px] pr-[22.286px] pb-[15.428px] pl-[47.78px] items-center self-stretch rounded-[50.295px] border-[1.714px] border-[solid] border-[var(--gray-300,#D1D5DB)] bg-[var(--white,_#FFF)] [box-shadow:0px_1.714px_3.429px_0px_rgba(0,_0,_0,_0.05)]"
							v-model="form.password"
							required
							autocomplete="current-password"
							placeholder="i.e. password#123" />
						<i :class="['absolute top-[25px] right-10 text-[24px] text-gray-600 fa fa-eye cursor-pointer', password_open ? 'fa-eye-slash' : 'fa-eye']" @click="password_view_status(!password_open)"></i>
						<i :class="['absolute top-[25px] right-10 text-[24px] fa fa-eye-slash text-gray-400 cursor-pointer', password_open ? 'fa-eye' : 'fa-eye-slash']" @click="password_view_status(!password_open)"></i>
					</div>
				</div>
	
				<div class="flex items-center justify-center mt-16">
					<PrimaryButton class="w-[618px]" :class="{ 'opacity-25': isLoading }" :disabled="isLoading">
						Login
					</PrimaryButton>
				</div>
			</form>
		</div>
		
		<img class="pt-10" src="/img/login-footer.png" alt="">
	</ClientOnly>
</template>
