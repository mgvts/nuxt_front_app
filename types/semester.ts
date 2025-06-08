import type { base64str } from ".";
import type { Lecture } from "./lecture";

export interface Semester {
  id: number;
  title: string;
  description: string;
  position: number;
  imageUrl?: base64str;
  lectures: Lecture[];
}
