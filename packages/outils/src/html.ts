export type ExcludeAr = string | { tag: string; excludeAttrs: string[] }

export function getPureHtml(
  html: string,
  excludeAttrs: ExcludeAr[] = [
    'font-family',
    'font-style',
    { tag: 'img', excludeAttrs: ['width', 'height'] },
  ],
) {
  if (!html) return ''
  // const d = document.createDocumentFragment();
  const div = document.createElement('div')
  div.innerHTML = html
  const ss = div.querySelectorAll('[style]')
  ss.forEach((ele: any) => {
    const style = ele.getAttribute('style').split(';')
    const eleTag = ele.tagName.toLowerCase()
    const validStyle = style.filter((val: any) => {
      if (val.search(/pt$/) > -1) return false
      return (
        excludeAttrs.filter((curr) => {
          // 若未字符串
          if (typeof curr === 'string')
            return val.toLocaleLowerCase().search(curr) !== -1

          // 若未对象且tag相同
          if (eleTag === curr.tag.toLowerCase()) {
            return (
              curr.excludeAttrs.filter(
                (attr) => val.toLocaleLowerCase().search(attr) !== -1,
              ).length > 0
            )
          }
          return true
        }).length === 0
      )
    })
    const validStyleStr = validStyle.join(';')
    ele.setAttribute('style', validStyleStr)
    ele.removeAttribute('face')
  })
  return div.innerHTML
}

export function getPureText(html: string) {
  if (!html) return ''
  const div = document.createElement('div')
  div.innerHTML = html
  return div.innerText?.trim()
}
