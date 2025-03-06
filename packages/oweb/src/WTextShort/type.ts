import type { OArcoDesign } from '@otypes/arcodesign'
import type { ODataType } from '@otypes/datatype'

export interface WTextShortProps {
  dataType?: ODataType.DATA_TYPE
  rateMax?: number
  content?: any
  emptyText?: string
  copyable?: boolean
  apperence?: 'tag' | 'dot' | 'link'
  status?: 'success' | 'warning' | 'danger' | 'info'
  prefix?: string // 前缀
  suffix?: string // 前缀
  bold?: boolean
  ellipsisConf?: boolean | OArcoDesign.EllipsisConfig // 省略
  dcitionaryCode?: string // 字典对应code，设置后会请求对应字典，并显示对应值
  options?: { label: string; value: unknown }[] // 设置了options 则显示字段会从数组中获取
  format?: (
    content?: any,
    props?: WTextShortProps,
  ) => Omit<WTextShortProps, 'format'>
}
