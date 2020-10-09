/**
 * 本地存储封装模块
 */

export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    // 把data 转为 javascript 对象
    return JSON.parse(data)
  }catch (err) {
    return data
  }
}

export const setItem = (name, value) => {
  // 如果 value 是对象， 就把 value 转为 JSON 格式字符串再存储
  if (typeof  value ==='object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const removeItem = (name) => {
  window.localStorage.removeItem(name)
}
