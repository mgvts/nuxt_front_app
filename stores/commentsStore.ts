// stores/lectureStore.ts
import { defineStore } from 'pinia'
import { api } from '~/composables/api'
import type { Comment } from '~/types/comments'
import type { Lecture } from '~/types/lecture'

export const useCommentsStore = defineStore('comments', () => {
  const comments = ref<Comment[] | null>(null)
  const loading = ref<boolean>(false)
  const getCommentsLoading = ref<boolean>(false)
  const addCommentsLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  async function getComments(lectureId: Lecture['id']) {
    getCommentsLoading.value = true
    error.value = null
    try {
      comments.value = await api.comments.getComments(lectureId)
    }
    catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
        error.value = e?.message || `Ошибка при загрузке лекции ${lectureId}`
      }
      throw e
    }
    finally {
      getCommentsLoading.value = false
    }
  }

  async function addComment(lectureId: Lecture['id'], text: string) {
    addCommentsLoading.value = true
    error.value = null
    try {
      const newComment = await api.comments.addComment(lectureId, text)
      if (!comments.value) return
      comments.value.push(newComment)
    }
    catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
        error.value = e?.message || `Ошибка при загрузке лекции ${lectureId}`
      }
      throw e
    }
    finally {
      addCommentsLoading.value = false
    }
  }

  const sortedComments = computed(() => {
    if (!comments.value) return []
    return comments.value.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  })

  return {
    loading,
    getCommentsLoading,
    addCommentsLoading,
    error,

    comments,
    sortedComments,
    getComments,
    addComment,
  }
})
