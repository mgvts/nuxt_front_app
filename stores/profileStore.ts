// stores/profileStore.ts
import { defineStore } from "pinia";
import { api } from "~/composables/api";
import type { Profile } from "~/types/profile";

export const useProfileStore = defineStore("profile", () => {
  const profiles = ref<Profile[]>([]);
  const currentProfile = ref<Profile | null>(null); // viewed profile
  const currentUserProfile = ref<Profile | null>(null); // logged in user profile
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  async function loadProfiles() {
    loading.value = true;
    error.value = null;
    try {
      profiles.value = await api.profile.getProfiles();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        error.value = e.message || `Ошибка при загрузке профилей`;
      }
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function loadProfile(login: string) {
    loading.value = true;
    error.value = null;
    try {
      currentProfile.value = await api.profile.getProfile(login);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        error.value = e.message || `Ошибка при загрузке профиля ${login}`;
      }
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function loadCurrentUserProfile(login: string) {
    loading.value = true;
    error.value = null;
    try {
      currentUserProfile.value = await api.profile.getProfile(login);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        error.value =
          e.message || `Ошибка при загрузке профиля пользователя ${login}`;
      }
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return {
    profiles,
    currentProfile,
    currentUserProfile,
    loading,
    error,

    loadProfiles,
    loadProfile,
    loadCurrentUserProfile,
  };
});
