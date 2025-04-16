<script setup lang="ts">
import { useRoute, useHead } from '#imports';

const route = useRoute();
// const userId = route.params.id as string;

// const { data: user, error } = useApi<User>(`/api/users/${userId}`);

useHead({
  title: "Профиль пользователя",
  meta: [{ name: "description", content: "Детали профиля пользователя" }],
});
// const getSplitName = computed(() => user.value?.name?.split(' '))
const contactMap = {
  email: 'mailto:',
  tg: 't.me/'
}

// const createContactHref = (c) => `${contactMap[c.type]}${c.contact}` 
// todo это поедет если поменяются id
const userImgMap = {
  15: '/images/art-shvetsov.png',
  17: '/images/sasha.png',
  21: '/images/artemii.png',
  22: '/images/vlad.png'
}
</script>

<template>
  <div v-if="true">
    here users
  </div>
  <div v-else>
    <div v-if="error">
      Ошибка загрузки пользователя.
    </div>
    <div v-else-if="!user">
      Загрузка...
    </div>
    <article v-if="user" class="container">
      <section class="user-info">
        <div class="avatar" >
          <img :src="userImgMap[user.id]" height="300" width="300" :alt="user.name">
        </div>
        <div class="info">
          <div>
            <UIText is-first-letter>{{ getSplitName?.[0] }}</UIText>&nbsp;
            <UIText is-first-letter>{{ getSplitName?.[1] }}</UIText>
          </div>
          <!-- todo here need add wrapper if >3 then need ellipsis else must render as col -->
          <div>
            <div v-for="ed of user.education" :key="ed.id">
              <UIText size="link">
                {{ ed.name }} {{ ed.startDate }}-{{ ed.endDate }}
              </UIText>
            </div>
          </div>

        </div>
      </section>
      <section class="user-lection">
        <div style="width: fit-content;" class="ma-auto h-100 d-flex align-center">
          <UIText>
            here will be link on lecture
          </UIText>
        </div>
      </section>
      <section class="user-work">

      </section>
      <section class="user-skills">

      </section>
      <section class="user-contact">
        <UIText>contacts:</UIText>
        <div class="links-grid">

        </div>
        <div v-for="contact of user.contacts" :key="contact.id">
          <UILink :href="createContactHref(contact)">{{ contact.contact }}</UILink>
        </div>
      </section>
    </article>
  </div>
</template>

<style lang="css" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.user-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;

  .avatar {
    height: 300px;
    width: 300px;
  }
}

.user-lection {
  width: 100%;
  height: 900px;
  background: lightcyan;
  border-radius: 50px;
}

.user-info {
  .links-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}
</style>
