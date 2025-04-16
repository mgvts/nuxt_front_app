<script setup lang="ts">
import { useProfileStore } from '~/stores/profileStore'
import { storeToRefs } from 'pinia'
import { useHead } from '#app'

useHead({ title: 'Пользователи' })

const profileStore = useProfileStore()
const { profiles, loading, error } = storeToRefs(profileStore)

onMounted(() => {
    if (!profiles.value.length) profileStore.loadProfiles()
})
</script>

<template>
    <div>
        <h1>Пользователи</h1>
        <div v-if="loading">Загрузка...</div>
        <div v-else>
            <ul>
                <li v-for="prof in profiles" :key="prof.login">
                    <NuxtLink :to="`/profiles/${prof.login}`">{{ prof.name }}</NuxtLink>
                </li>
            </ul>
            <div v-if="error" class="error">{{ error }}</div>
        </div>
    </div>
</template>
