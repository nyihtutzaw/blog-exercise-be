module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'unused-imports'],
    extends: ['plugin:@typescript-eslint/recommended'],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    rules: {
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': 'error',
    },
    settings: {
        node: {
            tryExtensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.node'],
        },
    },
};
