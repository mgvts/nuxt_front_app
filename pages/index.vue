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
</script>

<template>
  <UIColumn>
    <img
      class="itmo-img"
      src="/images/itmo-uni.png"
      width="1319"
      height="589"
      alt="ITMO University"
    >
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
      <UIText 
        is-first-letter
        size="text"
      >
        From knowledge to code: Improve your skills with the best frontend lecturers!
      </UIText>
    </div>
    <div class="second-text">
      <UIText
        is-first-letter
        size="text"
        style="margin-top: 130px; text-align: center;"
      >
        You create the code - we help you grow!
      </UIText>
    </div>
    <div class="cards profiles">
      <img src="/images/arrow.png" width="57" height="57" alt="arrow" class="arrow-left">
      <UILink to="profile/ArtyomShvetsov">
        <img src="/images/art-shvetsov.png" height="220" width="220" alt="Artyom Shvetsov">
      </UILink>
      <UILink to="profile/awakywaky">
        <img src="/images/sasha.png" height="220" width="220" alt="Sasha">
      </UILink>
      <UILink to="profile/kirat_0">
        <img src="/images/artemii.png" height="220" width="220" alt="Artemii">
      </UILink>
      <UILink to="profile/mgvts">
        <img src="/images/vlad.png" height="220" width="220" alt="Vlad">
      </UILink>
      <img src="/images/arrow.png" width="57" height="57" alt="arrow" class="arrow-right">
    </div>
    <div class="review">
      <UIText color="white" is-first-letter style="margin: 20px auto 0 75px;">
        Leave a review about the course:
      </UIText>
    </div>
  </UIColumn>
</template>

<style scoped>
main {
  margin: 60px;
}

.itmo-img {
  width: 100%;
  height: auto;
  margin: 0 auto;
  border-radius: 50px;
}

.cards {
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 42px;
  margin: 37px auto 0;
  justify-content: center;
}

@media (max-width: 768px) {
  .cards {
    gap: 20px;
  }
  
  .card {
    flex: 0 0 calc(50% - 20px);
    height: auto;
    min-height: 150px;
  }
}

@media (max-width: 480px) {
  .card {
    flex: 0 0 100%;
  }
}

.profiles {
  margin-top: 144px;
  gap: 61px;
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
  max-width: 220px;
  max-height: 220px;
  object-fit: contain;
  transition: all 0.3s ease;
}

@media (min-width: 768px) {
  .responsive-image {
    max-width: 260px;
    max-height: 260px;
  }
}

@media (min-width: 1200px) {
  .responsive-image {
    max-width: 300px;
    max-height: 300px;
  }
}

.review {
  width: 1318px;
  height: 557px;
  margin: 89px auto;
  background: black;
  border-radius: 50px;
}

</style>
