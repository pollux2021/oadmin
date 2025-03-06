import type { ODataType } from '@otypes/datatype'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

const GENDER_NAMES = ['男', '女']
// 默认数据类型格式化
export const DATE_TYPE_FORMATE: Record<
  ODataType.DATA_TYPE,
  (value?: any) => any
> = {
  gender: (value: any) => {
    return GENDER_NAMES[value] || '未知'
  },
  digit: (value?: any) => {
    return Number(value) || 0
  },
  rate: (value?: any) => {
    return Number(value) || 0
  },
  text: (value?: any) => {
    return value
  },
  date: (value?: any) => {
    return value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : value
  },
  'date-from-now': (value?: any) => {
    return value ? dayjs(value).fromNow() : value
  },
  'date-short': (value?: any) => {
    const setYear = dayjs(value).year()
    const curYear = dayjs().year()
    return value
      ? dayjs(value).format(`${setYear === curYear ? '' : 'YY年'}M月D日 HH:mm`)
      : value
  },
  'date-only': (value: any) => {
    return value ? dayjs(value).format('YYYY-MM-DD') : value
  },
  phone: (value?: string) => {
    if (!value || value.length !== 11) return value
    return value.replace(/^(.{3})(.*)(.{4})/, '$1-$2-$3')
  },
  currency: (value?: string | number) => {
    return value?.toLocaleString('zh-CN', {
      style: 'currency',
      currency: 'CNY',
    })
  },
  percent: (value?: string | number) => {
    return value?.toLocaleString('zh-CN', {
      style: 'percent',
      currency: 'CNY',
    })
  },
}
