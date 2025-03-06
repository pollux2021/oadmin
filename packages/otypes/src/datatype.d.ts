export declare namespace ODataType {
  // 数据类型
  export type DATA_TYPE =
    | 'text'
    | 'date'
    | 'date-short'
    | 'date-from-now'
    | 'date-only'
    | 'phone'
    | 'rate'
    | 'currency'
    | 'percent'
    | 'digit'
    | 'gender'

  // 基础数据类型
  type DataBaseTypeVal = 'string' | 'number' | 'string[]' | 'number[]' | 'split'
}
