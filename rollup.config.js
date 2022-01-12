import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
const { preserveShebangs } = require('rollup-plugin-preserve-shebangs');

export default {
  input: './index.js',
  output: [
    { file: './dist/main.cjs.js', format: 'cjs' },
    { file: './dist/main.module.js', format: 'es' },
    { file: './dist/main.umd.js', format: 'umd' }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',// 防止打包node_modules下的文件
      runtimeHelpers: true  // 使plugin-transform-runtime生效
    }),
    uglify(),
    preserveShebangs(),
  ]
}