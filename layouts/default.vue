<script setup lang="ts">
import messages from './locale.json'
import { LocaleKey } from '~/i18n/locales'

const { themeCookie, setTheme, locale } = useCookies()

onMounted(() => {
  const theme = useTheme()
  if (themeCookie.value) {
    setTheme(themeCookie.value)
    theme.global.name.value = themeCookie.value
  }
})
const isEngLocale = computed(() => locale.value === LocaleKey.EN)
const { t } = useI18n({ messages })
</script>

<template>
  <VLayout
    class="flex-column bg-background"
    style="min-height: 100vh"
    :class="{ 'eng-font': isEngLocale, 'ru-font': !isEngLocale }"
  >
    <UINavbar />
    <main class="main-layout">
      <slot />
    </main>
    <footer class="bg-primary-2 text-h4 py-4 text-center mt-10">
      {{ t("Создано в рамках Хакатона, 2025 год") }}
    </footer>
  </VLayout>
</template>

<style scoped lang="css">
.main-layout {
  min-height: calc(100vh - 72px);
  padding-top: 166px;
  margin: 0 auto;
  width: 1900px;
}

.eng-font {
  font-family: var(--font-lato);
}

.ru-font {
  font-family: var(--font-lato);
}

@media (width > 1920px) {
  .main-layout {
    width: 1900px;
  }
}

@media (1440px < width <=1920px) {
  .main-layout {
    width: 1400px;
  }
}

@media (1240px < width <=1440px) {
  .main-layout {
    width: 1200px;
  }
}

@media (940px < width <=1240px) {
  .main-layout {
    width: 900px;
  }
}

@media (width <= 940px) {
  .main-layout {
    width: 100%;
    padding: 8rem 1rem 0 1rem;
  }
}

@media (width <= 550px) {
  .main-layout {
    padding-top: 216px;
  }
}
</style>
