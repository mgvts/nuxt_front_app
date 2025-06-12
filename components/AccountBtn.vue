<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProfileStore } from '~/stores/profileStore'

const { login } = useCookies()
const profileStore = useProfileStore()
const { currentProfile } = storeToRefs(profileStore)

const isAuth = computed(() => !!login.value)

const getIcon = computed(() =>
  isAuth.value ? 'mdi-account' : 'mdi-account-outline',
)
const getPath = computed(() =>
  isAuth.value ? `/profiles/${login.value}` : '/auth',
)

// Load current user's profile when logged in
onMounted(async () => {
  if (isAuth.value && login.value) {
    await profileStore.loadProfile(login.value)
  }
})

// Watch for auth state changes
watch(isAuth, async (newIsAuth) => {
  if (newIsAuth && login.value) {
    await profileStore.loadProfile(login.value)
  }
  else {
    profileStore.currentProfile = null
  }
})
</script>

<template>
  <UILink
    :to="getPath"
    class="account-link"
  >
    <template v-if="isAuth">
      <div
        v-if="currentProfile?.avatarUrl"
        class="account-avatar"
      >
        <img
          :src="currentProfile.avatarUrl"
          :alt="currentProfile.name"
        >
      </div>
      <div
        v-else
        class="account-avatar placeholder-avatar"
      />
    </template>
    <template v-else>
      <v-icon
        color="primary"
        :size="60"
        class="account-icon"
      >
        {{ getIcon }}
      </v-icon>
    </template>
  </UILink>
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
  border: 2px solid rgb(var(--v-theme-primary));
  overflow: hidden;
}

.account-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-avatar {
  background: repeating-conic-gradient(
      rgba(var(--v-theme-primary), 0.1) 0% 25%,
      rgba(var(--v-theme-primary), 0.2) 0% 50%
    )
    50% / 20px 20px;
}

.account-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
