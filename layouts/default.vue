<script setup lang="ts">
import { LocaleKey } from "~/i18n/locales";

onMounted(() => {
  const { themeCookie, setTheme } = useI18nCookie();
  const theme = useTheme();
  if (themeCookie.value) {
    setTheme(themeCookie.value);
    theme.global.name.value = themeCookie.value;
  }
});
const { locale } = useI18nCookie();
const isEngLocale = computed(() => locale.value === LocaleKey.EN);
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
  </VLayout>
</template>

<style scoped lang="css">
.main-layout {
  padding-top: 166px;
  margin: auto;
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
    min-width: 600px;
    width: 100%;
    padding: 0 1rem;
  }
}
</style>
