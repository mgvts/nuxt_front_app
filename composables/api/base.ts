const BASE_URL = "https://ktcourse.ru/api/v1";

export const wrapGet =
  (resourcePath: string) =>
  <T>(suffix = "", config = {}): Promise<T> =>
    $fetch(`${BASE_URL}${resourcePath}${suffix}`, {
      method: "GET",
      ...config,
    });

export const wrapPost = 
  (resourcePath: string) =>
    <T>(suffix = "", config = {}): Promise<T> =>
      $fetch(`${BASE_URL}${resourcePath}${suffix}`, {
        method: "POST",
        ...config,
      });
