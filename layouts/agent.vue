<template>
	<div class="min-h-screen">
		<ClientOnly>
			<AppHeaderAgent />
			<main>
				<slot />
			</main>
		</ClientOnly>
	</div>
</template>
