import type { UserConfig } from 'vite'
import * as path from 'path'
import { PLUGINS_CONF } from './plugins'

const publicDir = path.resolve(__dirname, '../../public')
const lessVariablesPath = path.resolve(
  __dirname,
  '../theme/style/variables.less',
)
const ALIAS_CONF = {
  vue: 'vue/dist/vue.esm-bundler.js',
  '@': '.',
  '@public': path.resolve(__dirname, '../../public'),
  '@app': path.resolve(__dirname, '../../apps'),
  '@packages': path.resolve(__dirname, '../../packages'),
  '@outils': path.resolve(__dirname, '../../packages/outils/src'),
  '@ohooks': path.resolve(__dirname, '../../packages/ohooks/src'),
  '@oapis': path.resolve(__dirname, '../../packages/oapis/src'),
  '@oweb': path.resolve(__dirname, '../../packages/oweb/src'),
  '@oconstants': path.resolve(__dirname, '../../packages/oconstants/src'),
  '@otypes': path.resolve(__dirname, '../../packages/otypes/src'),
}

// https://vitejs.dev/config/
export const viteConfig: UserConfig = {
  resolve: { alias: ALIAS_CONF },
  plugins: PLUGINS_CONF,
  publicDir,
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: `@import "${lessVariablesPath}";`,
      },
    },
  },
}
