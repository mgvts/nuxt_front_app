// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt([
  {
    files: ["**/*.ts", "**/*.vue"],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },

  {
    files: ["**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
  {
    ignores: ["**/node_modules", "**/dist", "**/.nuxt", "**/.output"],
  },
]);
