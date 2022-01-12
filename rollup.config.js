import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
const { preserveShebangs } = require('rollup-plugin-preserve-shebangs');
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './index.ts',
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
    typescript({
      declaration: false,
      module: "ESNext"
    }),
    terser({
      format: {
        comments: false,
      },
    }),
  ]
}