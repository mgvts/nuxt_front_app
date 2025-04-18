import type { base64str, DateTime } from ".";
import type { ProfilePick } from "./profile";

export interface Lecture {
    slug: string

    imageUrl: base64str
    presentationUrl: base64str
    presentationId: string
    title: string
    description: string
    date: DateTime
    topicName: string
    profiles: ProfilePick[]
}
