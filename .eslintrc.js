module.exports = {
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module",
        "allowImportExportEverywhere": false,
    },
    "env": {
        "es6": true,
        "node": true
    },
    "rules": {
        'no-case-declarations': 'error',
        'no-multi-spaces': 'error',
        'no-useless-escape': 'error',
        'linebreak-style': 0,
        'max-len': [1, 160, 2, {
            ignoreUrls: true,
            ignoreComments: true,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true
        }],
        'comma-spacing': 'error',
        'keyword-spacing': ["error", { "before": true, "after": true }],
        'no-unused-vars': "off"
    }
};
