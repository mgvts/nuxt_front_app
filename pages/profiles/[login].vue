<script setup lang="ts">
import { useProfileStore } from '~/stores/profileStore'
import { storeToRefs } from 'pinia'
import { useRoute, useHead } from '#app'

const route = useRoute()
const login = route.params.login as string

const profileStore = useProfileStore()
const { currentProfile, loading, error } = storeToRefs(profileStore)

onMounted(async () => {
  try {
    await profileStore.loadProfile(login)
  } catch (e) {
    console.error('Failed to load profile:', e)
  }
})

useHead(() => ({
  title: currentProfile.value?.name || 'Профиль',
  meta: [
    {
      name: "description",
      content: `Профиль пользователя ${currentProfile.value?.name || ''}`,
    },
  ],
}))
</script>

<template>
  <div class="profile-container">
    <div v-if="loading" class="loading">
      Загрузка профиля...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <template v-else-if="currentProfile">
      <div class="profile-content">
        <div class="profile-avatar">
          <img 
            :src="currentProfile.avatarUrl" 
            :alt="currentProfile.name"
            class="avatar-image"
          />
        </div>
        <div class="profile-info">
          <h1 class="profile-name">{{ currentProfile.name }}</h1>
          <div class="profile-login">@{{ currentProfile.login }}</div>
          <div v-if="currentProfile.contacts.length > 0" class="contact-info">
            <div v-for="contact in currentProfile.contacts" :key="contact" class="contact-item">
              <div class="text">{{ contact }}</div>
            </div>
          </div>
        </div>
        <div class="additional-info">
          <div class="info-card">
            <template v-if="currentProfile.education.length > 0">
              <div class="info-section">
                <div class="info-title">{{ currentProfile.education[0].name }}</div>
                <div v-if="currentProfile.education[0].degree !== '-'" class="info-subtitle">
                  {{ currentProfile.education[0].degree }}
                </div>
              </div>
            </template>
            <template v-if="currentProfile.workExperience.length > 0">
              <div class="info-divider"></div>
              <div class="info-section">
                <div class="info-title">{{ currentProfile.workExperience[0].companyName }}</div>
                <div v-if="currentProfile.workExperience[0].jobName !== '-'" class="info-subtitle">
                  {{ currentProfile.workExperience[0].jobName }}
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.profile-container {
  padding: 2rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #003049;
}

.error {
  color: #dc3545;
}

.profile-content {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;
  align-items: start;
}

.profile-avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 2px solid #003049;
  overflow: hidden;
  background: #fff;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.profile-name {
  font-family: var(--font-grover);
  font-size: 4rem;
  color: #003049;
  margin: 0;
  line-height: 1;
}

.profile-login {
  font-family: var(--font-kantumruy);
  font-size: 2rem;
  color: #003049;
  opacity: 0.8;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-kantumruy);
  font-size: 1.4rem;
  color: #003049;
}

.additional-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 320px;
}

.info-card {
  background: #A0D6FF8A;
  border: 2px solid #003049;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.info-section {
  width: 100%;
  padding: 0.75rem;
}

.info-divider {
  width: 100%;
  height: 2px;
  background-color: #003049;
  margin: 1rem 0;
}

.info-title {
  font-family: var(--font-kantumruy);
  font-size: 1.6rem;
  color: #003049;
  font-weight: 500;
}

.info-subtitle {
  font-family: var(--font-kantumruy);
  font-size: 1.3rem;
  color: #003049;
  opacity: 0.8;
  margin-top: 0.5rem;
}

@media (max-width: 1400px) {
  .profile-avatar {
    width: 160px;
    height: 160px;
  }

  .profile-name {
    font-size: 3rem;
  }

  .profile-login {
    font-size: 1.5rem;
  }

  .contact-item {
    font-size: 1.1rem;
  }

  .info-title {
    font-size: 1.2rem;
  }

  .info-subtitle {
    font-size: 1rem;
  }

  .additional-info {
    min-width: 280px;
  }
}

@media (max-width: 1024px) {
  .profile-container {
    padding: 1.5rem;
  }

  .profile-content {
    gap: 1.5rem;
  }

  .profile-avatar {
    width: 140px;
    height: 140px;
  }

  .profile-name {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .profile-container {
    padding: 1rem;
  }

  .profile-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .profile-avatar {
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }

  .profile-info {
    text-align: center;
  }

  .contact-info {
    align-items: center;
  }

  .additional-info {
    width: 100%;
  }

  .info-card {
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>

