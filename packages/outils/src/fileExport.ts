import type { AxiosResponse } from 'axios'
/**
 * Get the content disposition name from the Axios response.
 * If a default file name is provided and the response does not contain a content disposition name,
 * the default file name will be returned.
 * @param response - The Axios response object.
 * @param defaultFileName - The default file name to be returned if the response does not contain a content disposition name.
 * @returns The content disposition name from the response, or the default file name if it is provided and the response does not contain a content disposition name.
 */
export function getAxiosContentDispositionName(
  response: AxiosResponse,
  defaultFileName?: string,
): string {
  const contentDisposition = response.headers['content-disposition']
  const fileNameMatch =
    contentDisposition && contentDisposition.match(/filename\*?=([^;]+)/i)
  const fileName =
    fileNameMatch && decodeURIComponent(fileNameMatch[1].replace(/\s+/g, ''))
  return fileName || defaultFileName || ''
}

/**
 * Downloads a file with the given name and content.
 * @param {string} fileName - The name of the file.
 * @param {string | Blob} content - The content of the file, which can be either a URL or a Blob.
 * @returns {void}
 */
export function createDowloadLink(
  fileName: string,
  content: string | Blob,
): void {
  if (typeof content === 'string') {
    window.open(content, '_blank')
  } else if (content instanceof Blob) {
    // Content is a Blob
    const link: HTMLAnchorElement = document.createElement('a')
    link.style.display = 'none'
    document.body.appendChild(link)
    const url: string = URL.createObjectURL(content)
    link.href = url
    link.download = fileName
    link.click()
    document.body.removeChild(link)
  } else {
    console.error('Invalid content type. Must be a URL or Blob.')
    return
  }
}
