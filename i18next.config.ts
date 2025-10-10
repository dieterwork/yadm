import { defineConfig } from "i18next-cli";

export default defineConfig({
  locales: ["en", "nl-be", "fr"],
  extract: {
    input: "src/**/*.{js,jsx,ts,tsx}",
    output: "src/features/i18n/{{language}}/{{namespace}}.json",
  },
});
