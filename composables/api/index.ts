// composables/api/index.ts
import { semester } from './semester'
import { lecture } from './lecture'
import { profile } from './profile'
import { auth } from './auth'
import { favorites } from './favorite'
// import { comments } from './comments'  // TODO: implement when ready

export const api = {
  semester,
  lecture,
  profile,
  auth,
  favorites,
  // comments
}
