import type { Profile } from './profile'

export type dateString = string

export type CommentAuthor = Pick<Profile, 'login' | 'name' | 'avatarUrl'>

export interface Comment {
  text: string
  createdAt: dateString
  author: CommentAuthor
}
