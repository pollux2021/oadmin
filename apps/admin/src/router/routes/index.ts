import { formatModules } from '@outils/guard/format'

const modules = import.meta.glob(['./modules/*.ts', '!**/_*.ts'], {
  eager: true,
})
export const appRoutes = formatModules(modules, [])
