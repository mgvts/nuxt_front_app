// vuetify.config.ts
import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'

const myTheme = {
    dark: false,
    colors: {
      'yellow': '#DBFF00',
      'violet': '#8E6FF8',
      'white': '#FFFFFF',
      'black': '#000000',


      error: '#B00020',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FB8C00',
    },
    variables: {
      'border-radius': '50px',
    }
  }


export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: 'myTheme',
    themes: {
        myTheme
    }
  },
  icons: {
    defaultSet: 'mdi',
  },
})
