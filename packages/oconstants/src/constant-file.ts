import type { OFile } from '@otypes/file'

export type FileTypeConfig = {
  accept: string[]
  icon: string
  defaultUploadText: string
}

export const API_FILE_PREFIX = import.meta.env.VITE_API_FILE_DOWNLOAD_PREFIX

export const FILE_TYPE_CONF: Record<OFile.FileType, FileTypeConfig> = {
  unknown: {
    accept: [],
    icon: 'ri-upload-2-fill',
    defaultUploadText: '上传文件',
  },
  image: {
    accept: ['png', 'jpg', 'jpeg', 'tif', 'gif', 'svg', 'apng', 'avif', 'webp'],
    icon: 'ri-image-fill',
    defaultUploadText: '上传图片',
  },
  music: {
    accept: ['mp3', 'wma', 'wav', 'ape', 'flac', 'ogg', 'aac'],
    icon: 'ri-mv-fill',
    defaultUploadText: '上传音频',
  },
  video: {
    accept: [
      'mp4',
      'wmv',
      'mov',
      'wmv',
      'asf',
      'asx',
      'avi',
      'dat',
      'mkv',
      'flv',
      'vob',
    ],
    icon: 'ri-movie-fill',
    defaultUploadText: '上传视频',
  },
  pdf: {
    accept: ['pdf'],
    icon: 'ri-file-pdf-fill',
    defaultUploadText: '上传PDF',
  },
  ppt: {
    accept: ['ppt', 'pptx'],
    icon: 'ri-file-ppt-2-fill',
    defaultUploadText: '上传PPT',
  },
  word: {
    accept: ['doc', 'docx'],
    icon: 'ri-file-word-2-fill',
    defaultUploadText: '上传Word',
  },
  excel: {
    accept: ['xls', 'xlsx'],
    icon: 'ri-file-excel-2-fill',
    defaultUploadText: '上传Excel',
  },
  zip: {
    accept: ['zip', 'rar', '7z'],
    icon: 'ri-folder-zip-fill',
    defaultUploadText: '上传压缩包',
  },
}
