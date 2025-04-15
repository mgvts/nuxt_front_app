import type { Lecture } from "./lecture"

export interface Semester {
    id: number
    title: string
    description: string
    position: number
    lectures: Lecture[]
}
