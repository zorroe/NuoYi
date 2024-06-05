export function tansParams(params: any) {
  const newParams = {} as any
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    if (value !== null && value !== '' && typeof (value) !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== '' && typeof (value[key]) !== 'undefined') {
            const para = `${propName}[${key}]`
            newParams[para] = value[key]
          }
        }
      }
      else {
        newParams[propName] = value
      }
    }
  }
  return newParams
}

export function parseTime(time: string | number, pattern?: string) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  }
  else {
    if ((typeof time === 'string') && (/^\d+$/.test(time))) {
      time = Number.parseInt(time)
    }
    else if (typeof time === 'string') {
      time = time.replace(/-/g, '/').replace('T', ' ').replace(/\.\d{3}/g, '')
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  } as any
  const time_str = format.replace(/\{([ymdhisa])+\}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = `0${value}`
    }
    return value || 0
  })
  return time_str
}
