import { defineConfig, loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { viteSingleFile } from "vite-plugin-singlefile";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { i18nextVitePlugin } from "@i18next-selector/vite-plugin";

const markdownLoader = () => {
  return {
    name: "markdown-loader",
    transform(code: JSON, id: string) {
      if (id.slice(-3) === ".md") {
        // For .md files, get the raw content
        return `export default ${JSON.stringify(code)};`;
      }
    },
  };
};

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const buildSingleHTMLFile = false;
  //process.env.VITE_BUILD_SINGLE_HTML_FILE === "true";

  const basePlugins = [
    react(),
    tailwindcss(),
    markdownLoader(),
    i18nextVitePlugin({
      // required:
      sourceDir: path.join(path.resolve(), "src", "assets", "locales"),
    }),
  ];

  const plugins = buildSingleHTMLFile
    ? [
        viteSingleFile(),
        createHtmlPlugin({
          minify: true,
        }),
        ...basePlugins,
      ]
    : basePlugins;

  return defineConfig({
    resolve: {
      alias: {
        $: path.resolve(__dirname, "./src"),
        $features: path.resolve(__dirname, "./src/features"),
        $shared: path.resolve(__dirname, "./src/shared"),
        $assets: path.resolve(__dirname, "./src/assets"),
      },
    },
    plugins,
  });
};
