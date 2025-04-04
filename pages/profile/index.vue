<script setup lang="ts">
import { useUsers } from '~/composables/useUsers';
import { useHead } from '#imports';

useHead({
  title: "Профили лекторов",
  meta: [{ name: "description", content: "Профили лекторов курса" }],
});

const { users, error } = useUsers();
</script>

<template>
  <div>
    <h1>Профили лекторов курса</h1>
    <div v-if="error">
      {{ error }}
    </div>
    <div v-else-if="!users || !users.length">
      Loading...
    </div>
    <ul v-else class="profile-list">
      <li v-for="user in users" :key="user.id">
        <UILink :to="`/profile/${user.id}`">{{ user.name }}</UILink>
      </li>
    </ul>
  </div>
</template>
