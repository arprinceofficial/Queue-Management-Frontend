<template>
	<div class="min-h-screen">
		<ClientOnly>
			<AppHeaderOffice />
			<main>
				<slot />
			</main>
		</ClientOnly>
	</div>
</template>
