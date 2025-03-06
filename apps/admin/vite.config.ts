import { defineConfig, loadEnv } from 'vite'
import { viteConfig } from '../../packages/vitest'

export default defineConfig((config) => {
  const envs = loadEnv(config.mode, './') as ImportMetaEnv
  console.log('envs', envs)
  return {
    ...viteConfig,
    base: envs.VITE_BUILD_BASE_PATH,
    preview: {
      proxy: { [envs.VITE_API_PREFIX as string]: envs.VITE_API_URL as string },
    },
    server: {
      proxy: { [envs.VITE_API_PREFIX as string]: envs.VITE_API_URL as string },
    },
    build: {
      outDir: envs.VITE_BUILD_OUT_DIR,
      assetsDir: envs.VITE_BUILD_ASSETS_DIR,
    },
    resolve: {
      alias: {
        ...viteConfig.resolve?.alias,
        '@': '/src',
      },
    },
  }
})
