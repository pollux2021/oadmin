export declare namespace OArcoDesign {
  export type Size = 'mini' | 'small' | 'medium' | 'large'
  export type LabelColProps = { span: number; offset?: number }
  export type WrapperColProps = { span: number; offset?: number }

  // 校验规则
  export type FormRuleRecord<T> = Record<keyof T, FormRule | FormRule[]>
  export type FormValidator = (
    value: FieldValue | undefined,
    callback: (error?: string) => void,
  ) => void
  export type FormRule = {
    required?: boolean
    message?: string
    type?:
      | 'string'
      | 'number'
      | 'boolean'
      | 'array'
      | 'object'
      | 'email'
      | 'url'
      | 'ip'
    length?: number
    maxLength?: number
    minLength?: string
    match?: RegExp
    uppercase?: string
    lowercase?: string
    min?: number
    max?: number
    equal?: number
    positive?: number
    negative?: number
    includes?: number
    validator?: FormValidator
  }

  // tableSecltion
  export type TableSelection = {
    type?: 'checkbox' | 'radio'
    selectedRowKeys?: (string | number)[]
    defaultSelectedRowKeys?: (string | number)[]
    showCheckedAll?: boolean
    title?: string
    width?: number
    fixed?: number
    checkStrictly?: boolean
    onlyCurrent?: boolean
  }

  export type TableBorder = {
    wrapper?: boolean
    cell?: boolean
    headerCell?: boolean
    bodyCell?: boolean
  }

  export type TableScroll = {
    x?: number | string
    y?: number | string
    minWidth?: number | string
    maxHeight?: number | string
  }

  export type TableDraggable = {
    type: 'row' | 'handle'
    title?: string
    width?: number
    fixed?: boolean
  }

  // pagination
  export type Pagination = {
    total: number
    current: number
    pageSize: number
  }

  export interface EllipsisConfig {
    rows?: number
    expandable?: boolean
    ellipsisStr?: string
    suffix?: string
    showTooltip?:
      | boolean
      | {
          type: 'tooltip' | 'popover'
          props: Record<string, any>
        }
  }
}
