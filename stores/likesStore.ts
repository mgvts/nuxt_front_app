import { defineStore } from 'pinia'
import { api } from '~/composables/api'

export const useLikesStore = defineStore('likes', {
  state: () => ({
    likesCount: 0,
    isLiked: false,
    loading: false,
  }),
  actions: {
    async fetchLikes(lectureId: number) {
      this.loading = true
      try {
        this.likesCount = await api.likes.getLikes(lectureId)
      }
      finally {
        this.loading = false
      }
    },
    async fetchIsLiked(lectureId: number) {
      this.loading = true
      try {
        this.isLiked = await api.likes.getIsLiked(lectureId)
      }
      finally {
        this.loading = false
      }
    },
    async like(lectureId: number) {
      this.loading = true
      try {
        await api.likes.like(lectureId)
        this.isLiked = true
        this.likesCount++
      }
      finally {
        this.loading = false
      }
    },
    async unlike(lectureId: number) {
      this.loading = true
      try {
        await api.likes.unlike(lectureId)
        this.isLiked = false
        this.likesCount = Math.max(0, this.likesCount - 1)
      }
      finally {
        this.loading = false
      }
    },
    async init(lectureId: number) {
      await Promise.all([
        this.fetchLikes(lectureId),
        this.fetchIsLiked(lectureId),
      ])
    },
  },
})
