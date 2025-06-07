<script setup lang="ts">
const { setTheme, themeCookie } = useI18nCookie()
const theme = useTheme()
const curTheme = ref(themeCookie.value)


function toggleTheme() {
    const newTheme = curTheme.value == 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    curTheme.value= newTheme
    theme.global.name.value = newTheme
}

const getToggleIcon = computed(() => curTheme.value === 'dark' ? 'mdi-weather-night' : 'mdi-weather-sunny')
</script>

<template>
    <UIIcon :icon="getToggleIcon" @click="toggleTheme" />
</template>

<style lang="css"></style>
