<script setup lang="ts">

const lectureStore = useLectureStore()

const {
    lectures
} = storeToRefs(lectureStore)

onMounted(async () => {
    if (!lectures.value?.length) {
        await lectureStore.loadLectures()
    }
})
</script>

<template>
    <div class="d-flex flex-column ga-15">
        <div v-for="lecture of lectures" :key="lecture.slug" class="d-flex flex-row ga-16 card">
            <UILink v-if="lecture.presentationId" :to="getPresentationExternalUrl(lecture.presentationId)"
                target="_blank">
                <ClientOnly>
                    <img :src="getPresentationPreviewUrl(lecture.presentationId)" class="lecture-thumbnail" width="420"
                        height="300" alt="Превью презентации">
                </ClientOnly>
            </UILink>
            <div v-else class="placeholder">
                Нет изображения
            </div>
            <div class="d-flex flex-column ga-3 justify-space-around">
                <UILink :to="`./${lecture.slug}`" class="title">
                    {{ lecture.title }}
                </UILink>
                <div>
                    <UILink v-for="profile of lecture.profiles" :key="profile.login" :to="`/profiles/${profile.login}`"
                        class="profile">
                        {{ profile.name }}
                    </UILink>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.lecture-thumbnail {
    cursor: pointer;
    border-radius: 50px;
    outline: 2px solid #003049;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.lecture-thumbnail:hover {
    transform: translateY(-2px);
    transition: all 0.3s ease;
    text-decoration: none !important;
}

.placeholder {
    width: 420px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    color: #999;
}

.card {
    background: #A0D6FF8A;
    border: 2px solid #003049;
    border-radius: 16px;
    padding: 2rem;
    margin-bottom: 2rem;
    width: 100%;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.title {
    font-family: var(--font-kantumruy);
    font-size: 3rem;
    color: #003049;
    line-height: 1;
    font-weight: 500;
}

.profile {
    font-family: var(--font-kantumruy);
    font-size: 2rem;
    color: #003049;
    line-height: 1;
}
</style>
