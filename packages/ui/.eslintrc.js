/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    extends: [
        '@repo/eslint-config/react-internal.js',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
        project: './tsconfig.lint.json',
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: ['postcss.config.mjs'],
};
