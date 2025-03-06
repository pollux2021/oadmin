import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx' // 要安装@vitejs/plugin-vue-jsx
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import * as path from 'path'

const uiWebPath = path.resolve(__dirname, '../oweb/src')
const globalComponents = path.resolve(__dirname, '../../components.d.ts')
const globalAutoComponents = path.resolve(__dirname, '../../auto-import.d.ts')
const globalAutoEslintJson = path.resolve(
  __dirname,
  '../../.eslintrc-auto-import.json',
)

// https://vitejs.dev/config/
export const PLUGINS_CONF = [
  vue({
    script: {
      defineModel: true,
      propsDestructure: true,
    },
  }),
  vueJsx(),
  Icons({
    compiler: 'vue3',
    scale: 1,
    defaultClass: 'inline-block',
  }),
  Components({
    resolvers: [
      ArcoResolver({
        sideEffect: true,
      }),
      IconsResolver({
        prefix: 'i',
      }),
      // {
      // 	type: 'component',
      // 	resolve: (name: string) => {
      // 		if (name.match(/^W[A-Z]/)) {
      // 			const importName = name.slice(1)
      // 			const config = {
      // 				name: importName,
      // 				from: './node_modules/ui/src-web/components',
      // 			}
      // 			return config
      // 		}
      // 	},
      // },
    ],

    // exclude: [],
    dirs: ['./src/components', uiWebPath],
    dts: globalComponents,
    deep: true,
  }),
  AutoImport({
    resolvers: [ArcoResolver()],
    // targets to transform
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/, // .md
    ],

    // global imports to register
    imports: ['vue', 'vue-router', '@vueuse/core'],
    dts: globalAutoComponents,
    eslintrc: {
      enabled: true,
      filepath: globalAutoEslintJson,
      globalsPropValue: true,
    },
  }),
]
