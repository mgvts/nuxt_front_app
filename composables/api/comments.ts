import type { Comment } from "~/types/comments";
import type { Lecture } from "~/types/lecture";
import { wrapGet, wrapPost } from "./base";

const post = wrapPost("/comments");
const get = wrapGet("/comments");

export const comments = {
  async getComments(lectureId: Lecture["id"]): Promise<Comment[]> {
    return await get<Comment[]>(`/${lectureId}`);
  },

  async addComment(
    lectureId: Lecture["id"],
    text: string
  ): Promise<Lecture["id"]> {
    return await post<Lecture["id"]>(`/${lectureId}`, {
      body: text,
    });
  },
};
