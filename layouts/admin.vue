<template>
	<div class="min-h-screen">
		<ClientOnly>
			<AppHeaderAdmin />
			<main>
				<slot />
			</main>
		</ClientOnly>
	</div>
</template>
