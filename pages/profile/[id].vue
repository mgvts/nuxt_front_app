<script setup lang="ts">
import type { User } from "~/server/api/users/[id]";

const route = useRoute();
const userId = route.params.id;
useHead({
  title: userId as string,
  meta: [
    { name: "description", content: `Профиль лектора с id ${route.params.id}` },
  ],
});
const user: User = await $fetch(`/api/users/${userId}`);
</script>

// @TODO: разнести это все по компонентам 
// и сделать красиво
<template>
  <div>
    <h1>{{ user.name ?? route.params.id }}</h1>
    <h2>Образование</h2>
    <div v-for="(edu, index) in user.education" :key="index">
      <div>
        <h3>{{ edu.name }}</h3>
        <div>{{ edu.degree }}</div>
        <div>
          <span>{{ edu.startDate }}</span>
          &mdash;
          <span>{{ edu.endDate }}</span>
        </div>
      </div>
    </div>
    <h2>Опыт работы</h2>
    <div v-for="(company, index) in user.workExperience" :key="index">
      <div>
        <h3>{{ company.companyName }}</h3>
        <div>{{ company.jobName }}</div>
        <div class="dates">
          <span>{{ company.startDate }}</span>
          &mdash;
          <span>{{ company.endDate }}</span>
        </div>
        <div>{{ company.description }}</div>
      </div>
    </div>
    <div v-for="(skill, index) in user.skills" :key="index">
      <div>
        <h3>{{ skill.skillName }}</h3>
        <div>{{ skill.proficiency }}</div>
      </div>
    </div>
	<div v-for="(contact, index) in user.contacts" :key="index">
      <div>
        <h3>{{ contact.type }}</h3>
        <div>{{ contact.contact }}</div>
      </div>
    </div>
  </div>
</template>
