<script setup lang="ts">
import { LocaleKey } from '~/i18n/locales'

const { locale, setLocale } = useCookies()

const getNextLocale = computed((): LocaleKey => {
  if (locale.value === LocaleKey.RU) {
    return LocaleKey.EN
  }
  return LocaleKey.RU
})

const updateLocale = async () => {
  setLocale(getNextLocale.value)
  await window.location.reload()
}
</script>

<template>
  <UIIcon
    class="cursor-pointer"
    icon="mdi-translate"
    @click="updateLocale"
  />
</template>
