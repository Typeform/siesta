module.exports = {
    extends: [
        'standard',
        'prettier/standard',
    ],
    env: {
        browser: false,
        commonjs: true,
        es6: true,
        jest: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: false,
            generators: true,
        },
    },
    rules: {
        'comma-dangle': ['error', 'always-multiline'],
        'complexity': ['warn', { max: 7 }],
        'no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: true,
            },
        ],
        'import/order': [
            'warn',
            {
                'newlines-between': 'always',
            },
        ],
        'import/export': 'warn',
        'prefer-template': 'warn',
        'no-shadow': 'warn',
        'object-shorthand': 'warn',
        'no-else-return': 'warn',
        'global-require': 'warn',
        'no-nested-ternary': 'warn',
        'no-unneeded-ternary': 'warn',
    }
}
