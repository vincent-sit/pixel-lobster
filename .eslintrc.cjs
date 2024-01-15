/* eslint-env node */
module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        'indent': ['error', 4, {'SwitchCase': 1}],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-console': [
            'warn'
        ],
        'no-unused-vars': [
            'warn'
        ],
        'eol-last': [
            'error',
            'always'
        ]
    }
};
