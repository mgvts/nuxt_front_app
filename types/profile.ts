import type { base64str } from "."

export interface Profile {
    login: string
    avatarUrl: base64str
    name: string
}

export type ProfilePick = Pick<Profile, 'login' | 'name' | 'avatarUrl'>
