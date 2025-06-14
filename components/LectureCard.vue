<script setup lang="ts">
import type { PropType } from 'vue'
import messages from './locale.json'
import type { Lecture } from '~/types/lecture'

const { t } = useI18n({ messages })

const { lecture, isFavorite, whenChangeFavorite } = defineProps({
  lecture: {
    type: Object as PropType<Lecture>,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    required: true,
  },
  whenChangeFavorite: {
    type: Function as PropType<() => void | Promise<void>>,
    required: true,
  },
  isLogin: {
    type: Boolean,
    default: false,
  },
})

const formatDate = (date: string) => {
  const d = new Date(date)
  const month = d.toLocaleString('en-US', { month: 'long' }).toLowerCase()
  return `${d.getDate()} ${t(`months.${month}`)}`
}
</script>

<template>
  <UILink
    v-if="lecture"
    :to="`/lectures/${lecture.id}`"
    class="lecture-card"
  >
    <div class="lecture-image-container">
      <ClientOnly v-if="lecture.presentationUrl">
        <img
          :src="lecture.presentationUrl"
          class="lecture-image"
          alt="Превью лекции"
        >
      </ClientOnly>
      <div
        v-else
        class="lecture-image-placeholder"
      >
        Нет изображения
      </div>
      <div
        v-if="isLogin"
        class="favorite-icon-container"
        @click.prevent
      >
        <div
          class="favorite-icon-wrapper"
          @click.prevent="whenChangeFavorite"
        >
          <UIIcon
            :icon="isFavorite ? 'mdi-star' : 'mdi-star-outline'"
            class="favorite-icon"
          />
        </div>
      </div>
    </div>
    <div class="lecture-content">
      <div class="lecture-header">
        <div class="lecture-date">
          {{ formatDate(lecture.date) }}
        </div>
        <div
          v-if="lecture.tags?.length"
          class="lecture-tags"
        >
          <span
            v-for="tag in lecture.tags"
            :key="tag"
            class="lecture-tag"
          >
            {{ tag }}
          </span>
        </div>
      </div>
      <div class="lecture-title">
        {{ lecture.title }}
      </div>
      <div class="lecture-description">
        {{ lecture.description }}
      </div>
      <div class="lecture-lecturers">
        <UILink
          v-for="profile in lecture.profiles"
          :key="profile.login"
          :to="`/profiles/${profile.login}`"
          class="lecturer-link"
          @click.stop
        >
          <div class="lecturer">
            <template v-if="profile.avatarUrl">
              <img
                :src="profile.avatarUrl"
                :alt="profile.name"
                class="lecturer-avatar"
              >
            </template>
            <template v-else>
              <div class="lecturer-avatar placeholder-avatar" />
            </template>
            <span class="lecturer-name">{{ profile.name }}</span>
          </div>
        </UILink>
      </div>
    </div>
  </UILink>
</template>

<style scoped lang="css">
.lecture-card {
  flex: 1 1 calc(25% - 2rem);
  min-width: 280px;
  background: rgb(var(--v-theme-primary-2));
  border-radius: 16px;
  text-decoration: none !important;
  box-shadow: 0 4px 24px rgba(142, 111, 248, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
}

.lecture-image-container {
  width: 100%;
  position: relative;
}

.lecture-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
  margin: 0;
}

.lecture-image-placeholder {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
  color: rgb(var(--v-theme-on-primary-2));
  font-size: var(--text-base);
  opacity: 0.8;
}

.lecture-content {
  padding: 0 1.5rem 1.5rem 1.5rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.lecture-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
}

.lecture-date {
  font-size: var(--text-base);
  color: rgb(var(--v-theme-on-primary-2));
  opacity: 0.8;
  white-space: nowrap;
}

.lecture-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.lecture-tag {
  font-size: var(--text-sm);
  color: rgb(var(--v-theme-on-primary-2));
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
}

.lecture-title {
  color: rgb(var(--v-theme-on-primary-2));
  margin: 0;
  font-weight: var(--font-bold);
  font-size: var(--text-2xl);
}

.lecture-description {
  font-size: var(--text-base);
  color: rgb(var(--v-theme-on-primary-2));
  opacity: 0.8;
}

.lecture-lecturers {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.lecturer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
}

.lecturer-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}

.lecturer-name {
  font-size: var(--text-sm);
  color: rgb(var(--v-theme-on-primary-2));
}

.favorite-icon-container {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 1;
}

.favorite-icon-wrapper {
  cursor: pointer;
  padding: 0.5rem;
}

.favorite-icon {
  font-size: 1.5rem;
  color: rgb(var(--v-theme-primary));
}

.lecturer-link {
  display: inline-flex;
  align-items: center;
}

.placeholder-avatar {
  background: repeating-conic-gradient(
      rgba(var(--v-theme-primary), 0.08) 0% 25%,
      rgba(var(--v-theme-on-primary), 0.08) 0% 50%
    )
    50% / 20px 20px;
}
</style>
