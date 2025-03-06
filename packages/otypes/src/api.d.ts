export declare module OApi {
  // 标准接口
  export interface Response<Data = unknown> {
    success: boolean
    code: string
    msg: string
    data: Data
  }

  // 分页接口
  export type ResponsePagination<Record = unknown, D = unknown> = Response<
    Pagination<Record, D>
  >

  // 分页Data
  export type Pagination<Record = unknown, D = unknown> = D & {
    current: number // 查询页数
    pageSize: number // 每页大小
    total: number // 总条数
    pages: number // 总页数
    records: Record[] // 分页数据
  }

  // 分页接口参数
  export type QueryPaginationParams<Params = unknown> = {
    current: number
    pageSize: number
    sortby?: string
    order?: 'asc' | 'desc'
  } & Params
}
