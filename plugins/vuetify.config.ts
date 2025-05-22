// vuetify.config.ts
import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";

const WHITE = "#FFFFFF"
const BLACK = "#000000"

const light = {
  dark: false,
  colors: {
    primary: "#7546AC",
    'on-primary': WHITE,
    'primary-1': "#7546AC",
    'on-primary-1': WHITE,
    'primary-2': "#F4DFF0",
    'on-primary-2': WHITE,

    secondary: "#bfbfb0",
    'secondary-1': "#f5f4df",

    white: WHITE,
    black: BLACK,

    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
  variables: {
    "border-radius": "50px",
  },
};

const dark = {
  dark: true,
  colors: {
    white: "#8E6FF8",
    black: "#000000",

    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
  variables: {
    "border-radius": "50px",
  },
};

export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: "light",
    themes: {
      light,
      dark,
    },
  },
  icons: {
    defaultSet: "mdi",
  },
});
