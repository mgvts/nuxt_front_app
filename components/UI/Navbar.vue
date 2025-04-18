<script setup lang="ts">
import logo from '~/assets/img/logo.svg'
import { ref } from 'vue'

const accountRotation = ref(0)
const menuScale = ref(1)

const spinAccount = () => {
    accountRotation.value += 360
}

const squishMenu = () => {
    menuScale.value = 0.8
    setTimeout(() => {
        menuScale.value = 1.2
        setTimeout(() => {
            menuScale.value = 1
        }, 150)
    }, 150)
}
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
                        <UIButton 
                            text=""
                            class="icon-button"
                            @click="spinAccount"
                        >
                            <v-icon 
                                icon="mdi-account" 
                                class="text-h2 text-white"
                                :style="{ transform: `rotate(${accountRotation}deg)`, transition: 'transform 0.5s ease' }"
                            />
                        </UIButton>
                        <UIButton 
                            text=""
                            class="icon-button"
                            @click="squishMenu"
                        >
                            <v-icon 
                                icon="mdi-menu" 
                                class="text-h2 text-white"
                                :style="{ transform: `scale(${menuScale})`, transition: 'transform 0.15s ease' }"
                            />
                        </UIButton>
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

.icon-button {
    background: transparent !important;
    padding: 8px !important;
    border-radius: 50% !important;
    transition: background-color 0.3s ease !important;
}

.icon-button:hover {
    background: rgba(255, 255, 255, 0.1) !important;
}

.icon-button:active {
    background: rgba(255, 255, 255, 0.2) !important;
}
</style>
