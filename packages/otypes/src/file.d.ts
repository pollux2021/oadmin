export declare namespace OFile {
  // 文件类型
  export type FileType =
    | 'unknown'
    | 'image'
    | 'music'
    | 'video'
    | 'pdf'
    | 'ppt'
    | 'word'
    | 'excel'
    | 'zip'

  // 文件类
  export interface FileItem {
    fileName: string
    filePath: string
    contentType?: string
    size?: number
    id?: string | number
    fileSizeText?: string
    dirFlag?: boolean
    createTime?: string
    type?: string
  }

  export interface PathItem {
    id: number
    fileName: string
    children?: PathItem[]
  }

  // 文件类上传
  export type UploadFileStatus =
    | 'init'
    | 'error'
    | 'done'
    | 'progress'
    | 'canceled'
  export interface UploadFileItem {
    uid: string
    file: File
    fileName: string
    status?: 'init' | 'error' | 'done' | 'progress' | 'canceled'
    precent?: string
    msg?: string
    response?: FileItem
    controller?: AbortController
    extraData?: any
  }

  // 文件预览
  export interface FileSource {
    name: string
    type: FileType
    suffix?: string
    url: string
  }
}
