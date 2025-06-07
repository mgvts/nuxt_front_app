<script setup lang="ts">
onMounted(()=> {
  const {themeCookie, setTheme} = useI18nCookie();
  const theme = useTheme()
  if (themeCookie.value) {
    setTheme(themeCookie.value)
    theme.global.name.value = themeCookie.value
  }
})
</script>

<template>
    <VLayout class="flex-column bg-background" >
      <UINavbar />
      <main class="main-layout">
        <slot />
      </main>
    </VLayout>
</template>

<style scoped lang="css">
.main-layout {
  padding-top: 240px;
  margin: auto;
}

.main-layout {
  width: 1900;
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

@media (width <=940px) {
  .main-layout {
    width: 100%;
    margin: 0 20px;
  }
}
</style>
