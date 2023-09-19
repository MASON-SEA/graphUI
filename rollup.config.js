const typescript = require('@rollup/plugin-typescript');
const resolve = require('@rollup/plugin-node-resolve'); // 添加这个插件
const commonjs = require('@rollup/plugin-commonjs'); // 添加这个插件
// const css = require('rollup-plugin-css-only'); // 添加这个插件
module.exports = {
  input: 'src/graphUI.ts', // 入口 TypeScript 文件
  output: {
    file: '../graphUI.js', // 输出 JavaScript 文件
    format: 'iife', // 输出格式为立即执行函数
    name: 'orui_control', // 全局变量名称（可选）
  },
  plugins: [
    typescript({}),
    resolve(), // 添加 @rollup/plugin-node-resolve 插件
    commonjs(), // 添加 @rollup/plugin-commonjs 插件], // 使用 TypeScript 插件
    // css({ output: 'dist/bundle.css' }),
  ],
};
