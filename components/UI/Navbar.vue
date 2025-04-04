<script setup lang="ts">
import logo from '~/assets/img/logo.svg'

const links = [
    { to: '/', text: 'info' },
    { to: '/profile', text: 'profile' },
    { to: '/profile', text: 'profile2' },
]
</script>

<template>
    <div>
        <v-app-bar scroll-behavior="hide" class="bg-transparent app-bar" flat :height="240">
            <div class="wrapper ">
                <div class="container bg-black rounded-pill d-flex px-10 w-100 flex-row justify-space-between items-center align-center">
                    <div>
                        <img :src="logo"/>
                    </div>
                    <div class="links text-white">
                        <UILink v-for="link of links" :key="link.to" :to="link.to">
                            {{ link.text }}
                        </UILink>
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
    margin: 60px;
    width: 100%;
}

.container {
    height: 120px;
}


.links {
    display: flex;
    flex-direction: row;
    gap: 60px;
}
</style>
