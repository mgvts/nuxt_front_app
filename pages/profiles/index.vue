<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import messages from './locale.json'
import { useProfileStore } from '~/stores/profileStore'
import { useHead } from '#app'

const { t } = useI18n({ messages })

useHead({
  title: t('pageTitles.profiles'),
  meta: [
    {
      name: 'description',
      content: t('pageTitles.profiles'),
    },
  ],
})

const profileStore = useProfileStore()
const { profiles, loading, error } = storeToRefs(profileStore)

onMounted(() => {
  if (!profiles.value.length) profileStore.loadProfiles()
})
</script>

<template>
  <div>
    <h1>Пользователи</h1>
    <div v-if="loading">
      Загрузка...
    </div>
    <div v-else>
      <ul>
        <li
          v-for="prof in profiles"
          :key="prof.login"
        >
          <NuxtLink :to="`/profiles/${prof.login}`">{{ prof.name }}</NuxtLink>
        </li>
      </ul>
      <div
        v-if="error"
        class="error"
      >
        {{ error }}
      </div>
    </div>
  </div>
</template>
