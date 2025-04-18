<script setup lang="ts">

const route = useRoute()
const slug = route.params.slug as string

const lectureStore = useLectureStore()

const {
    lecture,
    loading,
    error
} = storeToRefs(lectureStore)

onMounted(async () => {
    if (!lecture.value) {
        await lectureStore.loadLecture(slug)
    }
})
</script>

<template>
    <div>
        <div v-if="loading" class="loading">
            Загрузка семестра...
        </div>
        <div v-else-if="error" class="error">
            {{ error }}
        </div>
        <div v-if="lecture" class="d-flex flex-column ga-5">
            <div class="d-flex flex-row ga-16">
                <UILink v-if="lecture.presentationId" :to="getPresentationExternalUrl(lecture.presentationId)"
                    target="_blank">
                    <ClientOnly>
                        <img :src="getPresentationPreviewUrl(lecture.presentationId)" class="lecture-thumbnail"
                            width="420" height="300" alt="Превью презентации">
                    </ClientOnly>
                </UILink>
                <div v-else class="placeholder">
                    Нет изображения
                </div>
                <div class="d-flex flex-column ga-5">
                    <div class="title">
                        {{ lecture.title }}
                    </div>
                    <div class="description">
                        {{ lecture.description }}
                    </div>
                    <div class="d-flex flex-row ga-4">
                        <UILink v-for="profile of lecture.profiles" :key="profile.login"
                            :to="`/profiles/${profile.login}`" style="text-decoration: none;">
                            <span class="profile">
                                {{ profile.name }}
                            </span>
                        </UILink>
                    </div>
                </div>
            </div>
            <div class="widget">
                <span>Tут скоро будут комментарии</span>
                <span>и пользватели смогут
                    делиться своими впечатлениями</span>
                <span>касаемо вышеуказанной лекции</span>
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

.description {
    font-family: var(--font-kantumruy);
    font-size: 2rem;
    color: #003049;
    line-height: 1;
    font-weight: 500;
}

.profile {
    font-family: var(--font-kantumruy);
    font-size: 1.5rem !important;
    color: #003049;
    line-height: 1;
}

.widget {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 360px;
    background: #A0D6FF8A;

    font-family: var(--font-kantumruy);
    font-size: 1.5rem !important;
    color: #003049;
    line-height: 1;

    border-radius: 50px;
}
</style>
