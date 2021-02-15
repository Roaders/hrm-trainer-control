module.exports = {
    env: {
        browser: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'simple-import-sort'],
    ignorePatterns: ['dist/'],
    rules: {
        'prettier/prettier': [
            'error',
            { endOfLine: 'auto', tabWidth: 4, singleQuote: true, printWidth: 120, trailingComma: 'all' },
        ],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        '@typescript-eslint/explicit-member-accessibility': [
            'error',
            { accessibility: 'explicit', overrides: { constructors: 'no-public' } },
        ],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
    },
    overrides: [
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
                '@typescript-eslint/explicit-member-accessibility': 'off',
            },
        },
    ],
};
