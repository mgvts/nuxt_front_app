// composables/api/index.ts
import { auth } from './auth'
import { comments } from './comments'
import { favorites } from './favorite'
import { lecture } from './lecture'
import { likes } from './likes'
import { profile } from './profile'
import { semester } from './semester'

export const api = {
  semester,
  lecture,
  profile,
  auth,
  favorites,
  comments,
  likes,
}
