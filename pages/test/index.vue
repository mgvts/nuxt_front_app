<script lang="ts" setup>
import messages from './locale.json'
import logo from '@/assets/img/logo-light.svg'

const { t } = useI18n({ messages })
const titleContent = t('тайтл')
const textContent = t('текст')
</script>

<template>
  <div class="d-flex flex-column ga-5">
    <div class="bg-surface d-flex flex-row ga-7 px-12 py-8 rounded-8">
      <img :src="logo">
      <div class="d-flex flex-column ga-7">
        <div class="text-h2">
          {{ titleContent }}
        </div>
        <div class="">
          {{ textContent }}
        </div>
      </div>
    </div>
  </div>
</template>
