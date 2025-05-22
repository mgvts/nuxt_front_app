const BASE_URL = "/api";


export const wrapGet =
  (resourcePath: string) =>
  <T>(suffix = "", config = {}): Promise<T> =>
    useNuxtApp().$apiFetch(`${BASE_URL}${resourcePath}${suffix}`, {
      method: "GET",
      ...config,
    });

export const wrapPost = 
  (resourcePath: string) =>
    <T>(suffix = "", config = {}): Promise<T> =>
      useNuxtApp().$apiFetch(`${BASE_URL}${resourcePath}${suffix}`, {
        method: "POST",
        ...config,
      });
