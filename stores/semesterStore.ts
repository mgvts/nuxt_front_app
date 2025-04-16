import { api } from "~/composables/api"
import type { Semester } from "~/types/semester"

export const useSemesterStore = defineStore('semester', () => {
    const semesters = ref<Semester[]>([])


    const loadSemesters = async () => {
        const semesters = await api.semester.getSemesters()
        console.log(semesters)
    }

    return {
        semesters,
        loadSemesters
    }
})
