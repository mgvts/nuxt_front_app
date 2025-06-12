<script setup lang="ts">
const props = defineProps({
  author: { type: String, required: true },
  avatarUrl: { type: String, default: '' },
  time: { type: String, required: true },
  date: { type: String, required: true },
  text: { type: String, required: true },
  login: { type: String, required: true },
})
</script>

<template>
  <div
    class="comment-card"
    v-bind="$attrs"
  >
    <div class="comment-header">
      <UILink
        :to="`/profiles/${props.author.substring(1)}`"
        class="comment-avatar-link"
      >
        <div class="comment-avatar">
          <img
            v-if="avatarUrl"
            :src="avatarUrl"
            :alt="author"
          >
          <div
            v-else
            class="avatar-placeholder"
          />
        </div>
      </UILink>
      <div class="comment-meta">
        <div class="comment-meta-row">
          <span class="comment-author">{{ author }}</span>
          <div class="comment-time-info">
            <span class="comment-time">{{ time }}</span>
            <span class="comment-date">{{ date }}</span>
          </div>
        </div>
        <div class="comment-text">
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comment-card {
  width: 100%;
  padding: 0.5rem 0;
}
.comment-header {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}
.comment-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  background: none;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.comment-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.avatar-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: repeating-conic-gradient(
      rgba(var(--v-theme-primary), 0.08) 0% 25%,
      rgba(var(--v-theme-on-primary), 0.08) 0% 50%
    )
    50% / 20px 20px;
}
.comment-meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 0;
}
.comment-meta-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}
.comment-author-link {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}
.comment-author {
  color: rgb(var(--v-theme-primary));
  font-size: 1.25rem;
  font-weight: 500;
  white-space: nowrap;
  transition: opacity 0.2s ease;
  line-height: 1;
}
.comment-author-link:hover .comment-author {
  opacity: 0.8;
}
.comment-time-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.comment-time,
.comment-date {
  color: rgb(var(--v-theme-primary));
  font-size: 1rem;
  opacity: 0.8;
  white-space: nowrap;
}
.comment-text {
  color: rgb(var(--v-theme-primary));
  font-size: 1.2rem;
  margin-left: 0.1rem;
  margin-top: 0.5rem;
  word-break: break-word;
}
@media (max-width: 480px) {
  .comment-meta-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .comment-time-info {
    margin-left: 0;
  }
  .comment-author {
    font-size: 1.1rem;
  }
  .comment-time,
  .comment-date {
    font-size: 0.9rem;
  }
  .comment-text {
    font-size: 1.1rem;
  }
}
.comment-avatar-link {
  text-decoration: none;
  display: block;
}
.comment-avatar {
  cursor: pointer;
  transition: transform 0.2s ease;
}
.comment-avatar-link:hover .comment-avatar {
  transform: scale(1.05);
}
</style>
