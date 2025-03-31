<script setup lang="ts">
const props = defineProps({
	text: {
		type: String,
		required: true,
	},
	to: {
		type: String,
		required: true,
	},
	animate: {
		type: Boolean,
		default: false,
	},
})
</script>

<template>
	<NuxtLink :to="props.to" :class="{ animate }">
		{{ text }}
	</NuxtLink>
</template>

<style scoped lang="css">
.animate {
	color: red;
	text-decoration: none;
}
</style>