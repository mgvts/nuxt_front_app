<script setup lang="ts">
import { api } from '~/composables/api'
import type { Profile } from '~/types/profile'

const { login } = useCookies()
const avatarUrl = ref<Profile['avatarUrl'] | undefined>(undefined)

const loginValue = computed(() => login.value || '')

const getIcon = computed(() =>
  login.value ? 'mdi-account' : 'mdi-account-outline',
)
const getPath = computed(() =>
  login.value ? `/profiles/${login.value}` : '/auth',
)

// Load avatar when logged in
onMounted(async () => {
  if (login.value) {
    try {
      const profile = await api.profile.getProfile(login.value)
      avatarUrl.value = profile.avatarUrl
    }
    catch (e) {
      console.error('Failed to load avatar:', e)
    }
  }
})

// Watch for auth state changes
watch(login, async (newIsAuth) => {
  if (newIsAuth && login.value) {
    try {
      const profile = await api.profile.getProfile(login.value)
      avatarUrl.value = profile.avatarUrl
    }
    catch (e) {
      console.error('Failed to load avatar:', e)
    }
  }
  else {
    avatarUrl.value = undefined
  }
})
</script>

<template>
  <ClientOnly>
    <UILink
      :to="getPath"
      class="account-link"
    >
      <div v-show="login">
        <div
          v-if="avatarUrl"
          class="account-avatar"
        >
          <img
            :src="avatarUrl"
            :alt="loginValue"
          >
        </div>
        <div
          v-else
          class="account-avatar placeholder-avatar"
        />
      </div>
      <div v-show="!login">
        <v-icon
          color="primary"
          :size="60"
          class="account-icon"
          :icon="getIcon"
        />
      </div>
    </UILink>
  </ClientOnly>
</template>

<style scoped lang="css">
.account-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
}

.account-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin-top: 5px;
  margin-right: 10px;
  border: 2px solid rgb(var(--v-theme-primary));
  overflow: hidden;
}

.account-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-avatar {
  background: repeating-conic-gradient(rgba(var(--v-theme-primary), 0.1) 0% 25%,
      rgba(var(--v-theme-primary), 0.2) 0% 50%) 50% / 20px 20px;
}

.account-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
