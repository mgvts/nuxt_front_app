// composables/api/index.ts
import { semester } from './semester'
import { lecture } from './lecture'
import { profile } from './profile'
import { auth } from './auth'
// import { comments } from './comments'  // TODO: implement when ready

export const api = {
  semester,
  lecture,
  profile,
  auth,
  // comments
}