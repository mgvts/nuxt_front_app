<script setup lang="ts">

</script>

<template>
  <VTextField
    variant="outlined"
    v-bind="$attrs"
    base-color="primary"
    color="primary"
  >
    <slot />
  </VTextField>
</template>
