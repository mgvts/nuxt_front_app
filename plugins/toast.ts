import { defineNuxtPlugin } from "#app";
import Toast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    position: "top-right",
    duration: 3000,
    dismissible: true,
    containerClassName: "toast-container",
  });
});
