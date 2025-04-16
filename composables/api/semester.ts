import type { Semester } from "~/types/semester";

export const semester = {
  async getSemesters() {
    const res = await $fetch<Semester[]>('/api/semesters', {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJraXJhdG5pbmUiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NDQ3NTE3OTAsImV4cCI6MTc0NjIyMzAxOX0.epnVOnjX443BYsmkEEHXi7-R234tuuPrML5mcZLnq1SIU7F-wpgfEec7mtqwyD7QEj5ySrIuVB27vJzZXWbQ7g'
        }
    });
    return res;
  }
}
