import { LocaleKey, locales } from "./i18n/locales";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "vuetify-nuxt-module",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
  ],
  ssr: true,
  components: [
    {
      path: "~/components/UI/",
      prefix: "UI",
    },
    "~/components/",
  ],
  devtools: {
    enabled: true,
  },
  app: {
    head: {
      title: "Фронтенд 2024-2025 на Vue",
      htmlAttrs: {
        lang: "ru",
      },
      viewport: "width=device-width, initial-scale=1",
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon-light.svg",
          media: "(prefers-color-scheme: light)",
        },
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon-dark.svg",
          media: "(prefers-color-scheme: dark)",
        },
      ],
      meta: [
        {
          name: "theme-color",
          content: "#7546AC",
          media: "(prefers-color-scheme: light)",
        },
        {
          name: "theme-color",
          content: "#F4DFF0",
          media: "(prefers-color-scheme: dark)",
        },
      ],
    },
  },
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      apiBase: "https://ktcourse.ru/",
    },
  },
  routeRules: {
    "/api/**": {
      proxy: "http://84.201.151.242:8080/v1/**",
    },
  },
  compatibilityDate: "2024-11-01",
  nitro: {
    preset: "vercel",
  },
  vite: {},
  typescript: {
    strict: true,
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  i18n: {
    locales: locales.map(({ key }) => key),
    defaultLocale: LocaleKey.RU,
    strategy: "no_prefix",
    detectBrowserLanguage: false,
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  vuetify: {
    moduleOptions: {},
    vuetifyOptions: "./vuetify.config.ts",
  },
});
