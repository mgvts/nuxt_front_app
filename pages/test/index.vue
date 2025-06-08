<script lang="ts" setup>
import logo from '@/assets/img/logo-light.svg'
const textContent = `"Курс по базовому HTML познакомит вас с основами веб-разработки, включая создание структуры страницы, работу с текстом, ссылками, изображениями и простыми формами, чтобы вы могли создавать свои первые сайты с нуля`
</script>

<template>
    <div class="d-flex flex-column ga-5">
        <div class="bg-surface d-flex flex-row ga-7 px-12 py-8 rounded-8">
            <img :src="logo"/>
            <div class="d-flex flex-column ga-7">
                <div class="text-h2">
                    Some title
                </div>
                <div class="">
                    {{ textContent }}
                </div>
            </div>
        </div>
    </div>
</template>
