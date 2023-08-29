import { formatModules } from '@packages/outils/src/guard/format'

const modules = import.meta.glob(['./modules/*.ts', '!**/_*.ts'], {
  eager: true,
})
export const appRoutes = formatModules(modules, [])
