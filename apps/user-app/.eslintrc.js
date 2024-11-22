/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    extends: [
        '@repo/eslint-config/next.js',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
    ],
    plugins: ['@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: ['postcss.config.mjs'],
};
