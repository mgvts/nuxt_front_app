<script setup lang="ts">
useHead({
  title: "Главная",
  meta: [
    {
      name: "description",
      content: 'Главная страница курса "Фронтенд 2024-2025, ИТМО"',
    },
  ],
});

const userImgMap = {
  15: '/images/art-shvetsov.png',
  17: '/images/sasha.png',
  21: '/images/artemii.png',
  22: '/images/vlad.png'
}
onMounted(async () => {
  await $fetch('https://ktcourse.ru/api/v1/semesters')
  await $fetch('https://ktcourse.ru/api/v1/semesters/1')
  await $fetch('https://ktcourse.ru/api/v1/lectures/html')
  await $fetch('https://ktcourse.ru/api/v1/profiles')
  await $fetch('https://ktcourse.ru/api/v1/profiles/kiratnine')
})
</script>

<template>
  <div>
    <img class="itmo-img" src="/images/itmo-uni.png" width="1319" height="589" alt="ITMO University">
    <div class="cards">
      <img src="/images/arrow.png" width="57" height="57" alt="arrow" class="arrow-left">
      <UIMainNavigationCard>
        <UIText size="link">Feature 1</UIText>
      </UIMainNavigationCard>
      <UIMainNavigationCard color="#DBFF00">
        <UIText size="link">Feature 2</UIText>
      </UIMainNavigationCard>
      <UIMainNavigationCard color="#8E6FF8" text-color="white">
        <UIText size="link">Feature 3</UIText>
      </UIMainNavigationCard>
      <UIMainNavigationCard color="#000" text-color="white">
        <UIText size="link">Feature 4</UIText>
      </UIMainNavigationCard>
      <img src="/images/arrow.png" width="57" height="57" alt="arrow" class="arrow-right">
    </div>
    <div class="first-text">
      <UIText is-first-letter size="text"> 
        From knowledge to code: Improve your skills with the best frontend lecturers!
      </UIText>
    </div>
    <div class="second-text">
      <UIText is-first-letter size="text" style="margin-top: 130px; text-align: center;">
        You create the code - we help you grow!
      </UIText>
    </div>
    <div v-if="error">Ошибка при загрузке пользователей</div>
    <div v-if="users">
      <div class="cards profiles">
        <img src="/images/arrow.png" width="57" height="57" alt="arrow" class="arrow-left">
        <UILink v-for="user of users" :to="`./profile/${user.id}`">
          <img :src="userImgMap[user.id]" height="220" width="220" :alt="user.name">
        </UILink>
        <img src="/images/arrow.png" width="57" height="57" alt="arrow" class="arrow-right">
      </div>
    </div>
    <div class="review">
      <UIText color="white" is-first-letter style="margin: 20px auto 0 75px;">
        Leave a review about the course:
      </UIText>
      <UIText color="white" style="margin: 40px auto 0 75px">
        <a href="https://t.me/olegmokhov">@olegmokhov</a>
      </UIText>
    </div>
    <div>
        <div>https://docs.google.com/presentation/d/1tqYX1esIeqHsGzC1BDZJXnmy_TJAWniCkekTef18KSs/edit#slide=id.g34b31594e95_0_73</div>
        <img
          src="https://docs.google.com/presentation/d/1tqYX1esIeqHsGzC1BDZJXnmy_TJAWniCkekTef18KSs/export/png?pageid=g34b31594e95_0_73&w=400"
          alt="Превью слайда"
        />
        <UILink to="./semesters">to semesters</UILink>
    </div>
  </div>
</template>

<style scoped>
.itmo-img {
  width: 100%;
  height: auto;
  margin: 0 auto;
  border-radius: 50px;
}

.cards {
  width: 100%;
  display: flex;
  gap: 42px;
  margin: 50px auto 0;
  align-items: center;
  justify-content: center;
}

.profiles {
  margin-top: 144px;
  gap: 40px;
}

.arrow-left {
  rotate: -90deg;
  margin: auto 0;
}

.arrow-right {
  rotate: 90deg;
  margin: auto 0;
}

.first-text {
  margin: 100px auto 0;
  max-width: 1320px;
}

.second-text {
  margin: 0 37px 0 auto;
  max-width: 829px;
}

.responsive-image {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
}

.review {
  max-width: 1318px;
  height: auto;
  aspect-ratio: 1318/557;
  margin: 89px auto;
  background: black;
  border-radius: 50px;
}

@media (max-width: 1200px) {
  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
