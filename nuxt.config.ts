import { LocaleKey, locales } from './i18n/locales'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    'vuetify-nuxt-module',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt',
  ],
  ssr: true,
  components: [
    {
      path: '~/components/UI/',
      prefix: 'UI',
    },
    '~/components/',
  ],
  devtools: {
    enabled: true,
  },
  app: {
    head: {
      title: 'Фронтенд 2024-2025 на Vue',
      htmlAttrs: {
        lang: 'ru',
      },
      viewport: 'width=device-width, initial-scale=1',
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon-light.svg',
          media: '(prefers-color-scheme: light)',
        },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon-dark.svg',
          media: '(prefers-color-scheme: dark)',
        },
        {
          rel: 'apple-touch-icon',
          href: '/pwa/apple-touch-icon.png',
          sizes: '180x180',
        },
        {
          rel: 'manifest',
          href: '/manifest.json',
        },
      ],
      meta: [
        {
          name: 'theme-color',
          content: '#7546AC',
          media: '(prefers-color-scheme: light)',
        },
        {
          name: 'theme-color',
          content: '#F4DFF0',
          media: '(prefers-color-scheme: dark)',
        },
        {
          name: 'description',
          content: 'Фронтенд курс 2024-2025 на Vue',
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent',
        },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiBase: 'https://ktcourse.ru/',
    },
  },
  routeRules: {
    '/api/**': {
      // proxy: 'https://ktcourse.ru/',
      proxy: 'http://84.201.151.242:8080/v1/**',
    },
  },
  compatibilityDate: '2024-11-01',
  nitro: {
    preset: 'vercel',
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
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lang',
      alwaysRedirect: false,
      fallbackLocale: LocaleKey.RU,
    },
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  pwa: {
    registerType: 'autoUpdate',
    strategies: 'generateSW',
    injectRegister: 'auto',
    includeAssets: ['favicon.ico', 'favicon-light.svg', 'favicon-dark.svg'],
    manifest: {
      name: 'Фронтенд 2024-2025 на Vue',
      short_name: 'Фронтенд Vue',
      description: 'Фронтенд курс 2024-2025 на Vue',
      theme_color: '#7546AC',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/',
      id: '/',
      icons: [
        {
          src: '/pwa/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/pwa/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/pwa/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    devOptions: {
      enabled: true,
    },
  },
  vuetify: {
    moduleOptions: {},
    vuetifyOptions: './vuetify.config.ts',
  },
})
