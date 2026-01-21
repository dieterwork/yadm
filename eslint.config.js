import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";

export default defineConfig([
  globalIgnores(["dist"]),
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      reactHooks: reactHooks.configs["recommended-latest"],
      reactRefresh: reactRefresh.configs.vite,
      reactX: reactX.configs["recommended-typescript"],
      reactDom: reactDom.configs.recommended,
      eslintPluginJsxA11y: eslintPluginJsxA11y.flatConfigs.recommended,
    },
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      ecmaVersion: 2020,
      globals: { ...globals.browser, ...globals.node },
    },
  },
]);
