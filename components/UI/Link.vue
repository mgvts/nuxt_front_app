<script setup lang="ts">
const props = defineProps({
	to: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		default: 'transparent',
	},
	target: {
		type: String,
		default: undefined
	}
})
</script>

<template>
	<NuxtLink 
		:to="props.to" 
		:target="props.target" 
		class="link"
	>
		<UIText 
			:color="props.color"
			v-bind="$attrs"
		>
			<slot />
		</UIText>
	</NuxtLink>
</template>

<style lang="css" scoped>
.link {
    text-decoration: none;
}
</style>
