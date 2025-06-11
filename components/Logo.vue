<script setup lang="tsx">
import logoLight from '~/assets/img/logo-light.svg'
import logoDark from '~/assets/img/logo-dark.svg'

const props = defineProps({
  size: {
    type: Number,
    default: 105,
  },
})
const theme = useTheme()
const getLogoImg = computed(() => theme.global.current.value.dark ? logoDark : logoLight)
</script>

<template>
  <UIIcon
    to="/"
    :size="props.size"
  >
    <img :src="getLogoImg">
  </UIIcon>
</template>
