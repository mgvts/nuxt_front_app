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
<<<<<<< HEAD
  <h1>Сайт курса "Фронтенд 2024-2025, ИТМО"</h1>
  <p>Сделан на Vue, Nuxt.</p>
  <UILink to="/profile" text="Профили лекторов" />
  <div style="border: thin solid black; padding: 20px; margin: 20px; display: flex; flex-direction: column; gap: 200px">
    <li>
      this text Comp:
      <UIText
        is-first-letter
      >lorem 123123123123</UIText>
    </li>
    <li>
      this text Lint:
        <UILink 
          to="./profile" 
          color="red" 
          font="link"
        >profiles</UILink>
    </li>
  </div>
=======
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
      <UIText color="white" style="margin: 40px auto 0 75px">
        @olegmokov
      </UIText>
    </div>
  </UIColumn>
>>>>>>> 47003c5c1ea44c8b129a5a971d0cc519baedea91
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
