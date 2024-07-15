<script setup>
	useHead({ title: 'Home' });
	definePageMeta({ middleware: ['auth'] });
</script>

<template>
    <div class="min-h-[calc(100vh-75px)] flex flex-col justify-between items-center pt-6 pt-8">
        <div class="mt-24">
			<div>
				<div class="flex flex-col justify-center items-center">
					<!-- <NuxtLink to="/"> -->
						<ApplicationLogo :width="'404px'" :height="'121px'" />
					<!-- </NuxtLink> -->
					<h2 class="mt-6 text-center font-semibold text-[110px] tracking-tight text-gray-900 dark:text-gray-200 mt-[80px]">
                        Welcome
                    </h2>
                    <div class="flex items-center">
                        <span class="text-[#637381] text-[48px]">to&nbsp;</span> <span class="text-[#0070C0] text-[54px] font-bold">Digital</span> <span class="text-[#00B076] text-[54px] font-semibold">Bangsamoro</span>
                    </div>
                    <ButtonPrimary class="mt-[200px] w-[420px]">
						Get Started
					</ButtonPrimary>
				</div>
			</div>
		</div>

		<img class="pt-10" src="/img/login-footer.png" alt="">
    </div>
</template>