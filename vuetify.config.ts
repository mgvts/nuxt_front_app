// vuetify.config.ts
import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'

const WHITE = '#FFFFFF'
const BLACK = '#000000'

const lightColors = {
  white: '#FFFFFF',
  primary1: '#7546AC',
  primary2: '#F4DFF0',
  secondary1: '#F8F7E9',
  background: '#FFFFFF',
  surface: '#F8F7E9',
}

const darkColors = {
  white: '#FFFFFF',
  primary1: '#F4DFF0',
  primary2: '#7C71AF',
  secondary1: '#3C3C3C',
  background: '#26192C',
  surface: '#3C3C3C',
}

const light = {
  dark: false,
  colors: {
    'primary': lightColors.primary1,
    'on-primary': WHITE,
    'primary-1': lightColors.primary1,
    'on-primary-1': WHITE,

    'primary-2': lightColors.primary2,
    'on-primary-2': lightColors.primary1,

    'secondary': lightColors.secondary1,
    'on-secondary': lightColors.primary1,
    'secondary-1': lightColors.secondary1,
    'on-secondary-1': lightColors.primary1,

    'background': lightColors.background,
    'on-background': lightColors.primary1,

    'surface': lightColors.surface,
    'on-surface': lightColors.primary1,

    'white': WHITE,
    'black': BLACK,
  },
  variables: {
    'border-radius': '50px',
  },
}

const dark = {
  dark: true,
  colors: {
    'primary': darkColors.primary1,
    'on-primary': darkColors.background,
    'primary-1': darkColors.primary1,
    'on-primary-1': darkColors.background,

    'primary-2': darkColors.primary2,
    'on-primary-2': darkColors.primary1,

    'secondary': darkColors.secondary1,
    'on-secondary': darkColors.primary1,
    'secondary-1': darkColors.secondary1,
    'on-secondary-1': darkColors.primary1,

    'background': darkColors.background,
    'on-background': darkColors.primary1,

    'surface': darkColors.surface,
    'on-surface': darkColors.primary1,
  },
  variables: {
    'border-radius': '50px',
  },
}

export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: 'light',
    themes: {
      light,
      dark,
    },
  },
  icons: {
    defaultSet: 'mdi',
  },
})
