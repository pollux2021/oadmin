import { appRoutes } from '../routes'

const appClientMenus: any[] = appRoutes.map((el: any) => {
  const { name, path, meta, redirect, children } = el
  return { name, path, meta, redirect, children }
})

export default appClientMenus
