<script setup lang="ts">
import { useProfileStore } from '~/stores/profileStore'
import { storeToRefs } from 'pinia'
import { useRoute, useHead } from '#app'

const route = useRoute()
const login = route.params.login as string

useHead({ title: `Профиль ${login}` })

const profileStore = useProfileStore()
const { currentProfile: profile, loading, error } = storeToRefs(profileStore)

onMounted(() => {
  profileStore.loadProfile(login)
})
</script>

<template>
  <div>
    <h1>Профиль: {{ profile?.name }}</h1>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="profile">
      <p>Логин: {{ profile.login }}</p>
      <p>Email: {{ profile.email }}</p>
      <pre>
        {{ profile }}
      </pre>
    </div>
  </div>
</template>

