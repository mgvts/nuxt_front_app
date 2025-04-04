<script setup lang="ts">
const props = defineProps({
  color: {
		type: String,
		default: undefined,
	},
  textColor: {
    type: String,
    default: undefined,
  },
})
</script>

<template>
  <div 
    class="card" 
    :style="{
      backgroundColor: props.color, 
      color: props.textColor,
    }"
  >
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  height: auto;
  aspect-ratio: 264/188;
  border-radius: 40px;
  background-color: #fff;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
}

.card-content {
  width: 100%;
  padding: 16px;
}

@media (max-width: 768px) {
  .card {
    max-width: 264px;
    max-height: 188px;
  }
}
</style>
