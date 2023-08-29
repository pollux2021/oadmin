/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 获取对象中指定key，返回新的对象
 * @param obj object 初始对象对象
 * @param toKeys string[] 需要处理的key数组
 * @param exclude // 是否为排除 默认为false, 否则为包含
 * @returns
 */
export function getObjByKeys<T extends object, D extends keyof T>(
  obj: T,
  toKeys: D[],
  exclude?: false,
): Pick<T, D>
export function getObjByKeys<T extends object, D extends keyof T>(
  obj: T,
  toKeys: D[],
  exclude?: true,
): Omit<T, D>
export function getObjByKeys<T extends object, D extends keyof T>(
  obj: T,
  toKeys: D[],
  exclude = false,
): any {
  const nobj: any = {}
  const keys = Object.keys(obj) as (keyof T)[]
  keys.forEach((key) => {
    // 排除
    if (exclude && !toKeys.includes(key as any)) {
      nobj[key] = obj[key]
    }

    // 仅包含
    if (!exclude && toKeys.includes(key as any)) {
      nobj[key] = obj[key]
    }
  })
  return nobj
}

/**
 * query转obj
 * @param str
 * @returns
 */
export function getSearchObj<T extends object>(str: string): T | null {
  if (!str) return null
  const strde = decodeURI(str.replace('?', '')) // 解决中文乱码问题
  const obj: any = {}
  const arr = strde.split('&')
  for (let i = 0; i < arr.length; i++) {
    const [name, value] = arr[i].split('=')
    obj[name] = value
  }
  return Object.keys(obj).length > 0 ? obj : null
}

const MONTH_EN = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Spt',
  'Oct',
  'Nov',
  'Dec',
]
const MONTH_ZH = [
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月',
]
export function getMonthEn(month: number) {
  return MONTH_EN[month]
}

export function getMonthZh(month: number) {
  return MONTH_ZH[month]
}
