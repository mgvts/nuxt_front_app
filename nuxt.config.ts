/* eslint-disable @stylistic/quotes */
import { LocaleKey, locales } from "./i18n/locales";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "vuetify-nuxt-module",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@vite-pwa/nuxt",
  ],
  ssr: false,
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
        {
          rel: "apple-touch-icon",
          href: "/pwa/apple-touch-icon.png",
          sizes: "180x180",
        },
        {
          rel: "manifest",
          href: "/manifest.json",
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
        {
          name: "description",
          content: "Фронтенд курс 2024-2025 на Vue",
        },
        {
          name: "apple-mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
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
  pwa: {
    registerType: "autoUpdate",
    strategies: "generateSW",
    injectRegister: "auto",
    includeAssets: ["favicon.ico", "favicon-light.svg", "favicon-dark.svg"],
    manifest: {
      name: "Фронтенд 2024-2025 на Vue",
      short_name: "Фронтенд Vue",
      description: "Фронтенд курс 2024-2025 на Vue",
      theme_color: "#7546AC",
      background_color: "#ffffff",
      display: "standalone",
      orientation: "portrait",
      scope: "/",
      start_url: "/",
      id: "/",
      icons: [
        {
          src: "/pwa/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/pwa/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/pwa/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      globPatterns: [
        "**/*.{js,css,html,png,svg,ico,jpg,jpeg,json,txt,woff2,woff,ttf,eot,mp3,mp4,webm,webp,avif}",
      ],
      runtimeCaching: [
        {
          urlPattern: /^\/_nuxt\/.*$/,
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "nuxt-static",
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
          },
        },
        {
          urlPattern:
            /\.(?:png|jpg|jpeg|svg|gif|webp|avif|ico|mp3|mp4|webm|woff2?|ttf|eot)$/,
          handler: "CacheFirst",
          options: {
            cacheName: "assets-cache",
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
          },
        },
        {
          urlPattern: /\.(?:js|css)$/,
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "static-resources",
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
          },
        },
        {
          urlPattern: /.*/,
          handler: "NetworkFirst",
          options: {
            cacheName: "pages-cache",
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 7 * 24 * 60 * 60,
            },
          },
        },
      ],
      navigateFallback: "/",
    },
    devOptions: {
      enabled: true,
    },
  },
  vuetify: {
    moduleOptions: {},
    vuetifyOptions: "./vuetify.config.ts",
  },
});
