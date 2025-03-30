// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/fonts"],
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/nuxt_front_app/' : '/',
    head: {
      title: "Фронтенд 2024-2025 на Vue",
      htmlAttrs: {
        lang: "ru",
      },
      viewport: "width=device-width, initial-scale=1",
    },
  },
  typescript: {
    strict: true,
  },
});
