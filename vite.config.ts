import { defineConfig, loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { viteSingleFile } from "vite-plugin-singlefile";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const buildSingleHTMLFile =
    process.env.VITE_BUILD_SINGLE_HTML_FILE === "true";

  const plugins = buildSingleHTMLFile
    ? [
        viteSingleFile(),
        createHtmlPlugin({
          minify: true,
        }),
        react(),
        tailwindcss(),
        {
          name: "markdown-loader",
          transform(code, id) {
            if (id.slice(-3) === ".md") {
              // For .md files, get the raw content
              return `export default ${JSON.stringify(code)};`;
            }
          },
        },
      ]
    : [
        react(),
        tailwindcss(),
        {
          name: "markdown-loader",
          transform(code, id) {
            if (id.slice(-3) === ".md") {
              // For .md files, get the raw content
              return `export default ${JSON.stringify(code)};`;
            }
          },
        },
      ];

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
