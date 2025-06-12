<script setup lang="ts">
import { useHead, useRoute } from "#app";
import { storeToRefs } from "pinia";
import { useProfileStore } from "~/stores/profileStore";
import { ProfileContactType, type ProfileContact } from "~/types/profile";
import messages from "./locale.json";

const route = useRoute();
const login = route.params.login as string;

const profileStore = useProfileStore();
const {
  currentProfile,
  loading: profileLoading,
  error,
} = storeToRefs(profileStore);
const { t } = useI18n({ messages });
interface ApiError {
  message?: string;
  status?: number;
  statusText?: string;
  data?: unknown;
}
const favoriteStore = useFavoriteStore();
const { favoriteLectures, loading: favoriteLoading } =
  storeToRefs(favoriteStore);
const authStore = useAuthStore();
const { loginRef } = storeToRefs(authStore);

onMounted(async () => {
  try {
    await profileStore.loadProfile(login);
    await favoriteStore.getAll(login);
  } catch (e: unknown) {
    const error = e as ApiError;
    console.error("Failed to load profile:", e);
    console.error("Error details:", {
      message: error?.message,
      status: error?.status,
      statusText: error?.statusText,
      data: error?.data,
    });
  }
});

useHead(() => ({
  title: currentProfile.value?.name || "Профиль",
  meta: [
    {
      name: "description",
      content: `Профиль пользователя ${currentProfile.value?.name || ""}`,
    },
  ],
}));

const ContactMap = {
  [ProfileContactType.TG]: {
    icon: "mdi-telegram",
    link: (contact: string) => `https://t.me/${contact.substring(1)}`,
  },
  [ProfileContactType.PHONE]: {
    icon: "mdi-phone",
    link: (contact: string) => `tel:${contact}`,
  },
  [ProfileContactType.EMAIL]: {
    icon: "mdi-email",
    link: (contact: string) => `mailto:${contact}`,
  },
};

const wrapContacts = (contacts: ProfileContact[]) => {
  return contacts.map(({ type, contact }) => {
    const { icon, link } = ContactMap[type];
    return {
      icon,
      contact,
      link: link(contact),
    };
  });
};
const isCurrentUser = computed(() => {
  return currentProfile.value?.login === loginRef.value;
});

const logout = () => {
  authStore.logout();
  window.location.reload();
};
const loading = computed(() => profileLoading.value || favoriteLoading.value);
</script>

<template>
  <div class="profile-page">
    <div v-if="loading" class="loading">Загрузка профиля...</div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <template v-else-if="currentProfile">
      <div class="profile-main">
        <div class="profile-header-row">
          <div class="profile-avatar-block">
            <div class="profile-avatar">
              <img :src="currentProfile.avatarUrl" :alt="currentProfile.name" />
            </div>
          </div>
          <div class="profile-info-block">
            <h1 class="profile-name">
              {{ currentProfile.name }}
            </h1>
            <div class="profile-login">@{{ currentProfile.login }}</div>
            <div
              v-if="currentProfile.contacts?.length"
              class="profile-contacts"
            >
              <div
                v-for="contact in wrapContacts(currentProfile.contacts)"
                :key="contact.icon"
                class="contact-item"
              >
                <UIIcon :icon="contact.icon" :to="contact.link" :size="40" />
                <address style="margin: 0">
                  <template v-if="contact.icon === 'mdi-email'">
                    <a :href="`mailto:${contact.contact}`">{{
                      contact.contact
                    }}</a>
                  </template>
                  <template v-else-if="contact.icon === 'mdi-phone'">
                    <a :href="`tel:${contact.contact}`">{{
                      contact.contact
                    }}</a>
                  </template>
                  <template v-else-if="contact.icon === 'mdi-telegram'">
                    <a :href="contact.link" target="_blank">{{
                      contact.contact
                    }}</a>
                  </template>
                  <template v-else>
                    {{ contact.contact }}
                  </template>
                </address>
              </div>
            </div>
          </div>
        </div>
        <div class="profile-card-block">
          <div v-if="isCurrentUser" class="logout-block">
            <UIButton :text="t('выйти')" @click="logout" />
          </div>
          <div class="profile-card">
            <div class="profile-card-title">
              {{ currentProfile.education?.name || "—"
              }}<span
                v-if="
                  currentProfile.education?.degree &&
                  currentProfile.education.degree !== '-'
                "
                >, {{ currentProfile.education.degree }}</span
              >
            </div>
            <div class="profile-card-divider" />
            <div class="profile-card-title">
              {{ currentProfile.workExperience?.companyName || "—"
              }}<span
                v-if="
                  currentProfile.workExperience?.jobName &&
                  currentProfile.workExperience.jobName !== '-'
                "
                >, {{ currentProfile.workExperience.jobName }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex flex-column ga-5">
        <div class="text-h3">
          {{ t("Избранные лекции") }}
        </div>
        <div class="list-lectures">
          <template v-if="favoriteLectures?.length">
            <LectureCard
              v-for="lecture of favoriteLectures"
              :key="lecture.id"
              :lecture="lecture"
              :is-login="isCurrentUser"
              :is-favorite="favoriteStore.isLectureFavorite(lecture)"
              :when-change-favorite="
                () => favoriteStore.changeFavorite(lecture)
              "
            />
          </template>
          <div v-else class="empty-state">
            {{
              t(
                isCurrentUser
                  ? "Нет избранных лекций своя"
                  : "Нет избранных лекций",
                { name: currentProfile.name }
              )
            }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--violet-bg, #f5eaff);
  border-radius: 2rem;
  margin: 2rem 2rem 0 2rem;
  padding: 1rem 2rem;
}
.profile-logo {
  font-family: var(--font-grover);
  font-size: 3rem;
  color: var(--violet);
}
.profile-actions {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  font-size: 2rem;
  color: var(--violet);
}
.profile-main {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin: 2rem auto;
  max-width: 1200px;
  width: 100%;
  align-items: flex-start;
}
.profile-header-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2.5rem;
  width: 100%;
  margin-bottom: 2rem;
}
.profile-avatar-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}
.profile-info-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  align-items: flex-start;
  justify-content: center;
  min-width: 0;
}
.profile-name {
  font-size: var(--text-5xl);
  color: rgb(var(--v-theme-primary));
  margin: 0;
  line-height: var(--leading-tight);
  font-weight: var(--font-bold);
  transition: color 0.3s ease;
}
.profile-avatar {
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: repeating-conic-gradient(var(--white) 0% 25%, #e9e9e9 0% 50%) 50% /
    20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.profile-fav-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--violet);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
  padding: 0.5rem 1.2rem;
  border-radius: 1rem;
}
.profile-login {
  font-size: var(--text-xl);
  color: rgb(var(--v-theme-primary));
  opacity: 0.8;
  margin-bottom: 0.7rem;
  margin-top: 0;
  transition: color 0.3s ease;
}
.profile-contacts {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}
.contact-item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: var(--text-lg);
  color: rgb(var(--v-theme-primary));
  transition: color 0.3s ease;
}
.contact-item address a {
  text-decoration: none;
  color: inherit;
  transition: color 0.3s ease;
}
.contact-item address a:hover {
  text-decoration: underline;
  opacity: 0.8;
}
.profile-card-block {
  margin-left: 2rem;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.logout-block {
  width: 100%;
  min-width: 320px;
}
.profile-card {
  background: rgb(var(--v-theme-primary-2));
  border-radius: 1.5rem;
  padding: 2rem 2.5rem;
  min-width: 320px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 24px rgba(142, 111, 248, 0.08);
  transition: background-color 0.3s ease;
}
.profile-card-title {
  font-size: var(--text-2xl);
  color: rgb(var(--v-theme-primary));
  font-weight: var(--font-medium);
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}
.profile-card-divider {
  width: 100%;
  height: 2px;
  background: rgb(var(--v-theme-primary));
  margin: 1rem 0;
  border-radius: 1px;
  opacity: 0.3;
  transition: background-color 0.3s ease;
}
.profile-footer {
  background: var(--violet-bg, #f5eaff);
  color: var(--violet);
  text-align: center;
  font-family: var(--font-kantumruy);
  font-size: var(--text-lg);
  padding: 1.2rem 0;
  margin-top: 2rem;
  border-radius: 1.5rem 1.5rem 0 0;
}
@media (max-width: 1100px) {
  .profile-main {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  .profile-card-block {
    margin-left: 0;
    margin-top: 1.5rem;
  }
}
@media (max-width: 940px) {
  .profile-main {
    margin-top: 3rem;
    margin-left: 1rem;
  }
}
@media (max-width: 700px) {
  .profile-header {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    margin: 1rem 0 0 0;
  }
  .profile-main {
    flex-direction: column;
    gap: 1rem;
    margin: 1rem 0;
    margin-top: 3rem;
  }
  .profile-avatar {
    width: 160px;
    height: 160px;
  }
  .profile-card {
    min-width: 0;
    width: 100%;
    padding: 1rem;
  }
  .profile-name {
    font-size: var(--text-3xl);
  }
  .profile-card-block {
    margin-left: 0;
    margin-top: 1.5rem;
    width: 100%;
  }
  .logout-block {
    min-width: 0;
  }
}
@media (max-width: 900px) {
  .profile-header-row {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  .profile-info-block {
    align-items: center;
    text-align: center;
  }
}
.profile-logo,
.profile-fav-btn,
.profile-info-block,
.profile-name,
.profile-login,
.profile-contacts,
.contact-item,
.profile-card-title,
.profile-footer {
  font-family: var(--font-lato), sans-serif !important;
}
.loading,
.error {
  text-align: center;
  padding: 2rem;
  font-size: var(--text-lg);
  color: rgb(var(--v-theme-primary));
  transition: color 0.3s ease;
}
.error {
  color: rgb(var(--v-theme-error));
}
.list-lectures {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
  width: 100%;
}

.empty-state {
  text-align: center;
  font-size: var(--text-xl);
  color: rgb(var(--v-theme-primary));
  opacity: 0.8;
  padding: 3rem 0;
  font-family: var(--font-lato), sans-serif;
  transition: color 0.3s ease;
}

.logout-block :deep(.v-btn) {
  background: rgb(var(--v-theme-primary-2)) !important;
  color: rgb(var(--v-theme-primary)) !important;
  transition: all 0.3s ease !important;
}

.logout-block :deep(.v-btn:hover) {
  background: rgb(var(--v-theme-primary)) !important;
  color: rgb(var(--v-theme-on-primary)) !important;
}

:root[data-theme="dark"] .profile-card {
  background: rgba(var(--v-theme-primary), 0.1);
}

:root[data-theme="dark"] .profile-card-title {
  color: rgb(var(--v-theme-on-primary));
}

:root[data-theme="dark"] .profile-card-divider {
  background: rgb(var(--v-theme-on-primary));
}

:root[data-theme="dark"] .logout-block :deep(.v-btn) {
  background: rgba(var(--v-theme-primary), 0.1) !important;
  color: rgb(var(--v-theme-on-primary)) !important;
}

:root[data-theme="dark"] .logout-block :deep(.v-btn:hover) {
  background: rgb(var(--v-theme-primary)) !important;
  color: rgb(var(--v-theme-on-primary)) !important;
}

/* Dark theme overrides */
:root[data-theme="dark"] .profile-name,
:root[data-theme="dark"] .profile-login,
:root[data-theme="dark"] .contact-item,
:root[data-theme="dark"] .empty-state,
:root[data-theme="dark"] .loading {
  color: rgb(var(--v-theme-on-primary));
}

:root[data-theme="dark"] .contact-item address a:hover {
  opacity: 0.9;
}

:root[data-theme="dark"] .profile-login {
  opacity: 0.9;
}

:root[data-theme="dark"] .empty-state {
  opacity: 0.9;
}
</style>
