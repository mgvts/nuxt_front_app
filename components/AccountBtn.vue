<script setup lang="ts">
const { login } = useCookies();

const isAuth = computed(() => !!login.value);

const getIcon = computed(() =>
  isAuth.value ? "mdi-account" : "mdi-account-outline"
);
const getPath = computed(() =>
  isAuth.value ? `/profiles/${login.value}` : "/auth"
);
</script>

<template>
  <UIIcon :icon="getIcon" :to="getPath" />
</template>
