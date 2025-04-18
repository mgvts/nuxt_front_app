<script setup lang="ts">
import logo from '~/assets/img/logo.svg'
</script>

<template>
    <div>
        <v-app-bar scroll-behavior="hide" class="bg-transparent app-bar" flat :height="240">
            <div class="wrapper">
                <div class="container rounded-pill d-flex px-10 w-100 flex-row justify-space-between items-center align-center">
                    <UILink to="/" class="logo-link">
                        <img :src="logo">
                    </UILink>
                    <div class="links">
                        <v-icon icon="mdi-account" class="text-h2 text-white"/>
                        <v-icon icon="mdi-menu" class="text-h2 text-white"/>
                    </div>
                </div>
            </div>
        </v-app-bar>
    </div>

</template>

<style scoped lang="css">
.wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 40px;
    width: 100%;
}

.container {
    height: 120px;
    background: #003049;
}

.logo-link {
    margin-top: 12px;
}

.links {
    display: flex;
    flex-direction: row;
    gap: 40px;
}
</style>
