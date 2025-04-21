module.exports = {
    root: true,
    env: {
        node: true,
        es6: true // 确保启用ES6支持
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020, // 使用较新的ECMAScript版本
        sourceType: 'module' // 使用ES模块
    },
    rules: {
        'no-unused-vars': 'off', // 全局关闭未使用变量检查
    }
}