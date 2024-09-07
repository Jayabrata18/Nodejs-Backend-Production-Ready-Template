

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config({
    languageOptions: {
        parserOptions: {
            project: true,
            tsconfigRootDir: import.meta.dirname
        }
    },
    files: ['**/*.ts'],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommendedTypeChecked, eslintConfigPrettier],
    rules: {
        'no-console': 'error',
        'no-useless-catch': 0,
        quotes: ['error', 'single', { allowTemplateLiterals: true }]
    }
})
// ts-check

// import { Linter } from "eslint";
// import typescriptEslint from "@typescript-eslint/eslint-plugin";

// export default /** @type {Linter.Config} */ ({
//     parserOptions: {
//         project: true,
//         tsconfigRootDir: import.meta.dirname,
//     },
//     files: ["**/*.ts"],
//     extends: [
//         "eslint:recommended",
//         "plugin:@typescript-eslint/recommended",
//     ],
//     plugins: [
//         "@typescript-eslint",
//     ],
//     rules: {
//         "no-console": "error",
//         "quotes": ["error", "single", { "allowTemplateLiterals": true }],
//     },
// });
