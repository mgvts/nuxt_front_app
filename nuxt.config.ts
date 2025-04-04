// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: {
    enabled: true,
  },
  modules: ["@nuxt/eslint", "@nuxt/fonts", "vuetify-nuxt-module"],
  app: {
    head: {
      title: "Фронтенд 2024-2025 на Vue",
      htmlAttrs: {
        lang: "ru",
      },
      viewport: "width=device-width, initial-scale=1",
    },
  },
  components: [
    { 
      path: "~/components/UI/",
      prefix: "UI"
    },
    "~/components/"
  ],
  css: ["~/assets/css/main.css"],
  typescript: {
    strict: true,
  },
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: './plugins/vuetify.config.ts' 
  }
});
