import { API_FILE_PREFIX, FILE_TYPE_CONF } from '@oconstants/constant-file'
import type { OFile } from '@otypes/file'

const API_PREFIX = import.meta.env.VITE_API_PREFIX
/**
 * 获取文件后缀不含 "."
 * @param filePath 文件名称或路径
 * @returns string
 */
export function getFileSuffix(filePath?: string) {
  const pos = filePath?.lastIndexOf('.')
  if (pos === undefined || pos === -1) return ''
  return filePath?.substring(pos + 1).toLocaleLowerCase()
}

/**
 * 获取文件名称
 * @param filePath string 文件名或路径
 * @param suffix boolean 是否包含后缀
 * @returns string
 */
export function getFileName(filePath?: string, suffix?: boolean) {
  if (!filePath) return ''

  const pos = filePath.lastIndexOf('/')
  const fileName = pos === -1 ? filePath : filePath.substring(pos + 1)
  const staff = getFileSuffix(fileName)
  if (suffix || !staff) return fileName
  const reg = new RegExp(`\\.${staff}$`, 'i')
  return fileName.replace(reg, '')
}

/**
 * 获取文件类型
 * @param fileName
 * @returns
 */
export function getFileType(fileName?: string): OFile.FileType {
  const suffix = getFileSuffix(fileName)
  if (!suffix) return 'unknown'
  const fileTypes = Object.keys(FILE_TYPE_CONF) as OFile.FileType[]
  const suffixType = fileTypes.find((type) => {
    return FILE_TYPE_CONF[type].accept.includes(suffix)
  })
  return suffixType || 'unknown'
}

// 通过filePath获取文件的下载地址
export function getFileUrl(filePath?: string) {
  if (!filePath) return ''
  return `${API_FILE_PREFIX}?filePath=${filePath}&fileName=`
}

// 获取完整API_URL地址
export function getApiFullPath(apiUrl: string) {
  return `${API_PREFIX}${apiUrl}`
}

// 获取url
export function getFileItemUrl(fileItem?: string | OFile.FileItem) {
  if (!fileItem) return ''
  if (typeof fileItem === 'string') return fileItem
  return getFileUrl(fileItem.filePath)
}

/**
 * 获取文件下载地址
 * @param source FileSource
 * @returns string
 */
export function getFileSource(
  source: OFile.FileItem | string,
): OFile.FileSource | null {
  if (!source) return null

  // 仅字符串
  if (typeof source === 'string') {
    return {
      name: getFileName(source),
      type: getFileType(source),
      suffix: getFileSuffix(source),
      url: source,
    }
  }

  const { fileName, filePath } = source
  return {
    name: getFileName(fileName),
    type: getFileType(fileName),
    suffix: getFileSuffix(fileName),
    url: filePath,
  }
}

/**
 * 文件大小字节转换单位,
 * @param size
 * @returns {string|*}
 */
export function filterSize(size?: number) {
  if (!size) return ''
  if (size < pow1024(1)) return `${size} B`
  if (size < pow1024(2)) return `${(size / pow1024(1)).toFixed(2)} KB`
  if (size < pow1024(3)) return `${(size / pow1024(2)).toFixed(2)} MB`
  if (size < pow1024(4)) return `${(size / pow1024(3)).toFixed(2)} GB`
  return `${(size / pow1024(4)).toFixed(2)} TB`
}

// 求次幂
function pow1024(num: number) {
  return Math.pow(1024, num)
}
