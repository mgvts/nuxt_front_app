import type { RegisterPayload, LoginPayload, AuthResponse } from '@/types/auth'
import { wrapPost } from './base'

const post = wrapPost('/auth')

export const auth = {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    return await post<AuthResponse>('/register', {
      method: 'POST',
      body: payload
    })
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    console.log(payload)
    return await post<AuthResponse>('/login', {
      method: 'POST',
      body: payload
    })
  }
}
