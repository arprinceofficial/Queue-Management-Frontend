<script setup>
	useHead({ title: 'Home' });
	definePageMeta({ middleware: ['auth-office'], layout: 'office' });
</script>

<template>
    <div class="min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-75px)] flex flex-col justify-between items-center pt-2 lg:pt-6">
        <div class="mt-2 lg:mt-24">
			<div>
				<div class="flex flex-col justify-center items-center">
					<!-- <NuxtLink to="/"> -->
						<ApplicationLogo class="w-[80px] lg:w-[204px]"  />
					<!-- </NuxtLink> -->
					<h2 class="mt-2 lg:mt-6 text-center font-semibold text-[40px] lg:text-[110px] tracking-tight text-gray-900 dark:text-gray-200 mt-[10px] lg:mt-[80px]">
                        Welcome
                    </h2>
                    <div class="flex items-center">
                        <span class="text-[#637381] text-[24px] lg:text-[48px]">to&nbsp;</span> <span class="text-[#0070C0] text-[26px] lg:text-[54px] font-bold">Digital</span> <span class="text-[#00B076] text-[26px] lg:text-[54px] font-semibold">Bangsamoro</span>
                    </div>
                    <NuxtLink to="/service" class="mt-[60px] lg:mt-[200px] ">
						<ButtonPrimary class="lg:w-[420px] h-[45px] lg:h-[85px] text-[16px] lg:text-[32px]">
							Get Started
						</ButtonPrimary>
					</NuxtLink>
				</div>
			</div>
		</div>

		<img class="pt-6" src="/img/login-footer.png" alt="">
    </div>
</template>