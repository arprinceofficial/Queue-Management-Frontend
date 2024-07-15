<template>
	<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
		<ClientOnly>
			<AppHeaderV1 />
			<main>
				<slot />
			</main>
		</ClientOnly>
	</div>
</template>
