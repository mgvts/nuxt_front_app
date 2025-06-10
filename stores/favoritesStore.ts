// stores/authStore.ts
import debounce from 'lodash.debounce'
import { defineStore } from 'pinia'
import { api } from '~/composables/api'
import type { Lecture } from '~/types/lecture'
import type { Profile } from '~/types/profile'

export const useFavoriteStore = defineStore('favorite', () => {
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const favoriteLectures = ref<Lecture[]>([])

  async function add(lecture: Lecture) {
    console.log('add', lecture)
    loading.value = true
    error.value = null
    try {
      const val = await api.favorites.add(lecture.id)
      favoriteLectures.value.push(lecture)
      console.log(val)
      // toast add
    } finally { 
      loading.value = false
    }
  }

  async function remove(lecture: Lecture) {
    loading.value = true
    error.value = null
    try {
      await api.favorites.remove(lecture.id)
      removeElement(favoriteLectures.value, lecture)
    } finally {
      loading.value = false
    }
  }

    async function getAll(login: Profile['login']) {
    loading.value = true
    error.value = null
    try {
      favoriteLectures.value = await api.favorites.getAll(login)
    } finally {
      loading.value = false
    }
  }

  const isLectureFavorite = ({id}: {id: Lecture['id']}) => {
    return favoriteLectures.value.some((lec:Lecture) => lec.id === id)
  }

  const changeFavorite = debounce(async (lecture: Lecture) => {
    if (favoriteLectures.value.some(lec => lec.id === lecture.id)) {
      await remove(lecture)
    }else {
      await add(lecture)
    }
  }, 100)


  return {
    favoriteLectures,
    loading,
    error,
    add,
    remove,
    getAll,

    isLectureFavorite,
    changeFavorite,
  }
})
