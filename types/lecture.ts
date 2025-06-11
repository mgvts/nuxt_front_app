import type { ProfilePick } from './profile'
import type { base64str, DateTime } from '.'

export interface Lecture {
  id: number

  imageUrl: base64str
  presentationUrl: base64str
  presentationId: string
  title: string
  description: string
  date: DateTime
  topicName: string
  profiles: ProfilePick[]
  tags?: string[]
}
