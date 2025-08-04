import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  reactRecommended,

  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.eslint.json",
      },
      globals: globals.browser,
    },
    plugins: {
      js,
      react,
      "@typescript-eslint": tseslint.plugin,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "no-console": "error",
      "react/react-in-jsx-scope": "off",
      "react/jsx-max-props-per-line": [1, { maximum: 1, when: "always" }],

      // Сортировка импортов отключена - используется Prettier плагин
      // "simple-import-sort/imports": "off",
      // "simple-import-sort/exports": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "script",
    },
  },

  globalIgnores([
    "**/node_modules/",
    "**/dist/",
    "**/backend/",
    ".commitlint.config.cjs",
    "eslint.config.js",
  ]),
]);
