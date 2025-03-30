<!-- eslint-disable vue/no-multiple-template-root -->
<template>
	<header class="Links">
		<NuxtLink to="/">Главная</NuxtLink>
		<NuxtLink to="/profile">Профили</NuxtLink>
	</header>
	<main>
		<slot />
	</main>
</template>

<style>
.Links {
	display: flex;
	gap: 1rem;
	padding: 1rem 0;
}
</style>
