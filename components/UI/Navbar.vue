<script setup lang="ts">
const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <v-app-bar
    scroll-behavior="hide"
    class="px-15 bg-transparent"
    style="width: calc(100% + 0px)"
    :height="50"
    flat
    :extension-height="116"
  >
    <template #extension>
      <div
        class="d-flex flex-row justify-space-between bg-primary-2 w-100 align-center rounded-pill px-10 navbar-root"
      >
        <Logo />
        <div class="d-flex ga-4">
          <ClientOnly>
            <template #default>
              <AccountBtn v-if="isMounted" />
              <span
                v-else
                class="placeholder"
              />
            </template>
          </ClientOnly>
          <ClientOnly>
            <template #default>
              <I18nSwitch v-if="isMounted" />
              <span
                v-else
                class="placeholder"
              />
            </template>
          </ClientOnly>
          <ClientOnly>
            <template #default>
              <ThemeToggle v-if="isMounted" />
              <span
                v-else
                class="placeholder"
              />
            </template>
          </ClientOnly>
        </div>
      </div>
    </template>
  </v-app-bar>
</template>

<style scoped lang="css">
@media (max-width: 550px) {
  .navbar-root {
    margin-top: 80px !important;
    flex-direction: column !important;
    gap: 5px !important;
    border-radius: 50px !important;
    padding: 10px !important;
  }
}

.placeholder {
  height: 60px;
  width: 60px;
  background: rgb(var(--v-theme-primary));
  border-radius: 50%;
}
</style>
