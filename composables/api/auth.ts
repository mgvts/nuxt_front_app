import type { RegisterPayload, LoginPayload, AuthResponse } from '~/types/auth'

export const auth = {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    return await $fetch<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: payload
    })
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    return await $fetch<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: payload
    })
  }
}
