/// <reference types="vite/client" />
declare module 'mammoth/mammoth.browser'
declare module '@mojs/core'

interface ImportMetaEnv {
  readonly VITE_API_PREFIX: string
  readonly VITE_API_PAGE_SIZE: number
  readonly VITE_API_PROXY_URL: string
  readonly VITE_API_FILE_DOWNLOAD_PREFIX: string
  readonly VITE_API_CAPTCHA_URL: string
  readonly VITE_BUILD_ASSETS_DIR: string
  readonly VITE_BUILD_OUT_DIR: string
  readonly VITE_BUILD_BASE_PATH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
