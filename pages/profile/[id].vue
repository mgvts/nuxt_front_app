<script setup lang="ts">
const route = useRoute()
useHead({
  	title: route.params.id as string,
	meta: [
		{ name: "description", content: `Профиль лектора с id ${route.params.id}` },
	]
})
</script>

<template>
  <div>
    <p>{{ route.params.id }}</p>
  </div>
</template>
