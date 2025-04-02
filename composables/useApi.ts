// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useApi<T>(url: string, options?: any) {
    return useFetch<T>(url, {
      baseURL: useRuntimeConfig().public.apiBase, 
      ...options
    });
  }