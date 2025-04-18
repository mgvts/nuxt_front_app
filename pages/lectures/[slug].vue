<script setup lang="ts">
import { useLectureStore } from '~/stores/lectureStore'
import { storeToRefs } from 'pinia'
import { useRoute, useHead } from '#app'

const route = useRoute()
const slug = route.params.slug as string

useHead({ title: `Лекция ${slug}` })

const lectureStore = useLectureStore()
const { lecture, loading, error } = storeToRefs(lectureStore)

onMounted(() => {
    lectureStore.loadLecture(slug)
})
</script>

<template>
    <div>
        <div v-if="lecture">
            <pre>
                {{ lecture }}
            </pre>

            <div v-for="profile of lecture.profiles" :key="profile.login">
                <img :src="profile.avatarUrl">
                login: {{ profile.login }}
                <UILink :to="`/profiles/${profile.login}`">to profile</UILink>
            </div>
        </div>
    </div>
</template>
