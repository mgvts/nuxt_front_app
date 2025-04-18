import type { base64str } from "."

interface WorkExperience {
  companyName: string
  jobName: string
  location: string
  description: string
  startDate: string
  endDate: string
  occupationType: string
}

interface Education {
  name: string
  degree: string
  startDate: string
  endDate: string
}

export interface Profile {
  login: string
  avatarUrl: base64str
  name: string
  skills: string[]
  workExperience: WorkExperience[]
  education: Education[]
  contacts: string[]
  isEditable: boolean
}

export type ProfilePick = Pick<Profile, 'login' | 'name' | 'avatarUrl'>
