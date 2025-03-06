import type { ORouter } from '@otypes/router'

// 格式化Vite自动导入路由模块
// import.meta.glob('./modules/*.ts', { eager: true })
export function formatModules(
  _modules: any,
  result: ORouter.AppRouteRecordRaw[],
) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default
    if (!defaultModule) return
    const moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule]
    result.push(...moduleList)
  })
  return result
}
