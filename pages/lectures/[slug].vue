<script setup lang="ts">
import { useHead } from "#app";
import { useToast } from "vue-toast-notification";
import CommentCard from "~/components/CommentCard.vue";
import { useCommentsStore } from "~/stores/commentsStore";
import { useFavoriteStore } from "~/stores/favoritesStore";
import { useLikesStore } from "~/stores/likesStore";
import { useProfileStore } from "~/stores/profileStore";
import messages from "./locale.json";

const { t } = useI18n({ messages });

const route = useRoute();
const slug = +route.params.slug;
const lectureStore = useLectureStore();
const {
  lecture,
  loading: lectureLoading,
  error: lectureError,
} = storeToRefs(lectureStore);

const commentsStore = useCommentsStore();
const {
  sortedComments,
  loading: commentsLoading,
  error: commentsError,
} = storeToRefs(commentsStore);
const authStore = useAuthStore();
const { isLogin, loginRef } = storeToRefs(authStore);

const profileStore = useProfileStore();
const { currentProfile } = storeToRefs(profileStore);

const likesStore = useLikesStore();
const { likesCount, isLiked } = storeToRefs(likesStore);
const isLikeLoading = ref(false);

const favoriteStore = useFavoriteStore();
const isFavoriteLoading = ref(false);

const toast = useToast();

const isLoading = computed(() => lectureLoading.value || commentsLoading.value);
const hasError = computed(() => lectureError.value || commentsError.value);

const isInitialLoad = ref(true);

const loadFavorites = async () => {
  if (isLogin.value && loginRef.value) {
    try {
      await favoriteStore.getAll(loginRef.value);
    } catch (e) {
      console.error("Error loading favorites:", e);
    }
  } else {
    favoriteStore.favoriteLectures = [];
  }
};

// Load current user's profile during SSR if logged in
const { data: profileData } = await useAsyncData(
  "currentProfile",
  async () => {
    if (isLogin.value && loginRef.value) {
      await profileStore.loadProfile(loginRef.value);
      return profileStore.currentProfile;
    }
    return null;
  },
  {
    server: true,
    immediate: true,
  }
);

onBeforeMount(async () => {
  isInitialLoad.value = true;
  try {
    await Promise.all([
      lectureStore.loadLecture(slug),
      commentsStore.getComments(slug),
      likesStore.init(slug),
      loadFavorites(),
    ]);
  } catch (e) {
    console.error("Error loading lecture data:", e);
  } finally {
    isInitialLoad.value = false;
  }
});

watch([isLogin, loginRef], async ([newIsLogin, newLoginRef]) => {
  if (newIsLogin && newLoginRef) {
    await Promise.all([loadFavorites(), profileStore.loadProfile(newLoginRef)]);
  } else {
    favoriteStore.favoriteLectures = [];
    profileStore.currentProfile = null;
  }
});

const currentCommentText = ref("");
const isLastCommentImpl = ref(false);

const sendComment = async (ev: KeyboardEvent) => {
  if (ev.ctrlKey) {
    currentCommentText.value += "\n";
    return;
  }

  const trimmedText = currentCommentText.value.trim();
  if (!trimmedText) {
    toast.error(t("Комментарий не может быть пустым"), {
      position: "top-right",
      duration: 3000,
    });
    return;
  }

  isLastCommentImpl.value = true;
  try {
    await commentsStore.addComment(slug, trimmedText);
    currentCommentText.value = "";
    toast.success(t("Комментарий успешно добавлен"), {
      position: "top-right",
      duration: 3000,
    });
  } catch (e) {
    console.error("Error adding comment:", e);
    toast.error(t("Не удалось добавить комментарий. Попробуйте позже."), {
      position: "top-right",
      duration: 5000,
    });
  } finally {
    isLastCommentImpl.value = false;
  }
};

const handleLike = async () => {
  if (!isLogin.value) {
    toast.error(t("Необходимо войти в систему"), {
      position: "top-right",
      duration: 3000,
    });
    return;
  }

  isLikeLoading.value = true;
  try {
    if (isLiked.value) {
      await likesStore.unlike(slug);
    } else {
      await likesStore.like(slug);
    }
  } catch (e) {
    console.error("Error toggling like:", e);
    toast.error(t("Не удалось поставить лайк. Попробуйте позже."), {
      position: "top-right",
      duration: 3000,
    });
  } finally {
    isLikeLoading.value = false;
  }
};

const handleFavorite = async () => {
  if (!isLogin.value) {
    toast.error(t("Необходимо войти в систему"), {
      position: "top-right",
      duration: 3000,
    });
    return;
  }

  if (!lecture.value) return;

  isFavoriteLoading.value = true;
  try {
    await favoriteStore.changeFavorite(lecture.value);
  } catch (e) {
    console.error("Error toggling favorite:", e);
    toast.error(t("Не удалось добавить в избранное. Попробуйте позже."), {
      position: "top-right",
      duration: 3000,
    });
  } finally {
    isFavoriteLoading.value = false;
  }
};

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ru-RU");
}

useHead(() => ({
  title: lecture.value
    ? `${lecture.value.title} | ${t("pageTitles.lecture")}`
    : t("pageTitles.lecture"),
  meta: [
    {
      name: "description",
      content: lecture.value?.description || t("pageTitles.lecture"),
    },
  ],
}));
</script>

<template>
  <div class="lecture-page">
    <div v-if="hasError" class="error-state">
      {{ lectureError || commentsError }}
    </div>
    <div v-else-if="isLoading" class="loading-state">
      {{ t("loading") }}
    </div>
    <div v-else-if="lecture" class="d-flex flex-column ga-5">
      <div class="lecture-header">
        <div class="lecture-media">
          <UILink
            v-if="lecture.presentationId"
            :to="getPresentationExternalUrl(lecture.presentationId)"
            target="_blank"
          >
            <ClientOnly>
              <img
                :src="lecture.presentationUrl"
                class="lecture-thumbnail"
                :alt="t('noImage')"
              />
            </ClientOnly>
          </UILink>
          <div v-else class="placeholder">
            {{ t("noImage") }}
          </div>
        </div>
        <div class="lecture-info">
          <div class="title">
            {{ lecture.title }}
          </div>
          <div class="description">
            {{ lecture.description }}
          </div>
          <div class="lecture-lecturers">
            <UILink
              v-for="profile in lecture.profiles"
              :key="profile.login"
              :to="`/profiles/${profile.login}`"
              class="lecturer-link"
            >
              <div class="lecturer">
                <template v-if="profile.avatarUrl">
                  <img
                    :src="profile.avatarUrl"
                    :alt="profile.name"
                    class="lecturer-avatar"
                  />
                </template>
                <template v-else>
                  <div class="lecturer-avatar placeholder-avatar" />
                </template>
                <span class="lecturer-name">{{ profile.name }}</span>
              </div>
            </UILink>
          </div>
        </div>
      </div>
      <div class="d-flex flex-column">
        <ClientOnly>
          <div class="actions-container">
            <button
              class="like-button"
              :class="{ 'is-liked': isLiked }"
              :disabled="isLikeLoading"
              @click="handleLike"
            >
              <UIIcon
                :icon="isLiked ? 'mdi-heart' : 'mdi-heart-outline'"
                class="like-icon"
              />
              <span class="likes-count">{{ likesCount }}</span>
            </button>
            <button
              v-if="isLogin"
              class="favorite-button"
              :class="{
                'is-favorite':
                  lecture && favoriteStore.isLectureFavorite(lecture),
              }"
              :disabled="isFavoriteLoading"
              @click="handleFavorite"
            >
              <UIIcon
                :icon="
                  lecture && favoriteStore.isLectureFavorite(lecture)
                    ? 'mdi-star'
                    : 'mdi-star-outline'
                "
                class="favorite-icon"
              />
              <span class="favorite-text">
                {{
                  lecture && favoriteStore.isLectureFavorite(lecture)
                    ? t("В избранном")
                    : t("Добавить в избранное")
                }}
              </span>
            </button>
          </div>
          <template #fallback>
            <div class="actions-container">
              <div class="like-button-placeholder" />
              <div class="favorite-button-placeholder" />
            </div>
          </template>
        </ClientOnly>
        <div v-if="isLogin">
          <div class="comment-input-row">
            <div class="comment-input-avatar">
              <img
                v-if="currentProfile?.avatarUrl"
                :src="currentProfile.avatarUrl"
                :alt="currentProfile.login"
              />
              <div v-else class="avatar-placeholder" />
            </div>
            <input
              v-model="currentCommentText"
              class="comment-input-field"
              :placeholder="t('Введите комментарий')"
              type="text"
              @keydown.enter="sendComment"
            />
          </div>
          <div class="comment-input-actions">
            <UIButton
              color="primary-2"
              hover-color="primary"
              class="comment-input-btn"
              :text="t('addComment')"
              @click="sendComment"
            >
              <div class="btn-content">
                {{ t("addComment") }}
              </div>
            </UIButton>
          </div>
        </div>
        <section class="lecture-comments">
          <h2 class="comments-title">
            {{ t("comments") }}
          </h2>
          <template v-if="commentsLoading">
            <div>{{ t("loadingComments") }}</div>
          </template>
          <template v-else-if="commentsError">
            <div class="error-state">
              {{ commentsError }}
            </div>
          </template>
          <template v-else-if="sortedComments.length">
            <CommentCard
              v-for="comment in sortedComments"
              :key="comment.author.login + comment.createdAt"
              :author="'@' + comment.author.login"
              :avatar-url="comment.author.avatarUrl || ''"
              :time="formatTime(comment.createdAt)"
              :date="formatDate(comment.createdAt)"
              :text="comment.text"
              :login="comment.author.login"
            />
          </template>
          <div v-else class="empty-state">
            {{ t("noComments") }}
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.lecture-page {
  margin-top: 3rem;
}

.lecture-header {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.lecture-media {
  flex: 0 0 420px;
  max-width: 100%;
}

.lecture-info {
  flex: 1;
  min-width: 280px;
}

.lecture-thumbnail {
  width: 100%;
  height: auto;
  aspect-ratio: 420/300;
  object-fit: cover;
  cursor: pointer;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.placeholder {
  width: 100%;
  aspect-ratio: 420/300;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(var(--v-theme-surface-variant));
  color: rgb(var(--v-theme-on-surface-variant));
  border-radius: 16px;
}

.title {
  font-family: var(--font-kantumruy);
  font-size: clamp(2rem, 5vw, 3rem);
  color: rgb(var(--v-theme-primary));
  line-height: 1.2;
  font-weight: 500;
  margin-bottom: 1rem;
}

.description {
  font-family: var(--font-kantumruy);
  font-size: clamp(1.25rem, 3vw, 2rem);
  color: rgb(var(--v-theme-on-surface));
  line-height: 1.3;
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.profile {
  font-family: var(--font-kantumruy);
  color: rgb(var(--v-theme-on-surface));
  line-height: 1;
}

.widget {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 360px;
  background: #a0d6ff8a;

  font-family: var(--font-kantumruy);
  font-size: 1.5rem !important;
  color: #003049;
  line-height: 1;

  border-radius: 50px;
}

.lecture-comments {
  margin-top: 4rem;
}
.comments-title {
  color: rgb(var(--v-theme-on-surface));
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: rgb(var(--v-theme-on-surface));
}

.error-state {
  color: rgb(var(--v-theme-error));
}

.lecture-lecturers {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
  align-items: center;
}

.lecturer {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  white-space: nowrap;
  text-decoration: none;
}

.lecturer-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.lecturer-name {
  font-size: var(--text-sm);
  color: rgb(var(--v-theme-on-surface));
  line-height: 24px;
}

.placeholder-avatar {
  background: repeating-conic-gradient(
      rgba(var(--v-theme-primary), 0.08) 0% 25%,
      rgba(var(--v-theme-on-primary), 0.08) 0% 50%
    )
    50% / 20px 20px;
}

@media (max-width: 768px) {
  .lecture-header {
    flex-direction: column;
  }

  .lecture-media {
    flex: 0 0 auto;
    width: 100%;
  }

  .lecture-info {
    width: 100%;
  }

  .lecture-lecturers {
    flex-direction: column;
    align-items: flex-start;
  }

  .actions-container {
    margin-left: 0;
    margin-top: 1rem;
  }
}

.comment-input-row {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
}
.comment-input-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  background: none;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.comment-input-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.avatar-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: repeating-conic-gradient(
      rgba(var(--v-theme-primary), 0.08) 0% 25%,
      rgba(var(--v-theme-on-primary), 0.08) 0% 50%
    )
    50% / 20px 20px;
}
.comment-input-field {
  flex: 1;
  font-size: 1.5rem;
  border: none;
  border-bottom: 2px solid rgb(var(--v-theme-primary));
  background: transparent;
  color: rgb(var(--v-theme-on-background));
  padding: 0.5rem 0;
  outline: none;
  transition: border-color 0.2s;
}
.comment-input-field::placeholder {
  color: rgb(var(--v-theme-on-background));
  opacity: 0.5;
}
.comment-input-field:focus {
  border-bottom: 2px solid rgb(var(--v-theme-primary));
}
.comment-input-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.2rem;
  width: 100%;
}
.comment-input-btn {
  min-width: 100px;
  max-width: 180px;
}

.btn-content {
  width: auto;
  padding: 0.4rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 1.5rem;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 600px) {
  .comment-input-row {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  .comment-input-avatar {
    margin: 0 auto 0.5rem auto;
  }
  .comment-input-actions {
    justify-content: flex-end;
  }
  .btn-content {
    min-width: 80px;
    font-size: 0.95rem;
    padding: 0.35rem 0.8rem;
    height: 32px;
  }
}

.actions-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 4rem;
}

.like-button,
.favorite-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1.5rem;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  color: rgb(var(--v-theme-on-surface));
  font-size: 1.1rem;
}

.like-button:hover,
.favorite-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.like-button.is-liked,
.favorite-button.is-favorite {
  background: rgba(var(--v-theme-primary), 0.2);
  color: rgb(var(--v-theme-primary));
}

.like-button.is-liked:hover,
.favorite-button.is-favorite:hover {
  background: rgba(var(--v-theme-primary), 0.3);
}

.like-button:disabled,
.favorite-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.like-icon,
.favorite-icon {
  font-size: 1.25rem;
}

.likes-count,
.favorite-text {
  font-size: var(--text-sm);
  font-weight: 500;
}

.like-button-placeholder,
.favorite-button-placeholder {
  width: 80px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  animation: pulse 1.5s infinite;
}

.favorite-button-placeholder {
  width: 200px;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.6;
  }
}
</style>
