<script setup>
	const route = useRoute();
	const current_path = computed( () => route.path );
	const current_route = computed( () => route.name );
	
	const hamburger_button = useState('hamburger_button');
	watch(current_path, (newVal) => {
		if(current_route.value == 'service-slug'){
			hamburger_button.value = false;
		} else {
			hamburger_button.value = true;
		}
	});
</script>
<template>
	<!-- {{ current_path }} <br> {{ current_route }} -->
	<div class="min-h-screen">
		<ClientOnly>
			<AppHeaderOffice />
			<main>
				<!-- <ServiceLeftSide /> -->
				<slot />
			</main>
		</ClientOnly>
	</div>
</template>
