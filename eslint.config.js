import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(['build/*', 'config/*']),
  {
    ...js.configs.recommended,
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser }
  },
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/prop-types': 'off'
    }
  }
]);
