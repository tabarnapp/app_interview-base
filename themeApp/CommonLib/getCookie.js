export const getCookie = function(name) {
  if (typeof document === 'undefined') return null
  const cookie = document.cookie
  const setPos = cookie.search(new RegExp('\\b' + name + '='))
  const stopPos = cookie.indexOf(';', setPos)
  if (!~setPos) return null
  const res = decodeURIComponent(cookie.substring(setPos, ~stopPos ? stopPos : undefined).split('=')[1])
  return (res.charAt(0) === '{') ? JSON.parse(res) : res
};