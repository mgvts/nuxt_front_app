<script setup lang="ts">

</script>

<template>
    <v-app-bar scroll-behavior="hide" class="px-15 bg-transparent" :height="50" flat :extension-height="116">
        <template #extension>
            <div class="d-flex flex-row justify-space-between bg-primary-2 w-100 align-center rounded-pill px-10">
                <Logo />
                <div class="d-flex ga-4">
                    <UIIcon icon="mdi-account" to="/auth"/>
                    <ThemeToggle/>
                </div>
            </div>
        </template>
    </v-app-bar>
</template>

<style scoped lang="css">
</style>
