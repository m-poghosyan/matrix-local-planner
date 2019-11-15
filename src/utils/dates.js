export const parseODataDate = str =>
  str ? Number(str.replace(/\D+/g, '')) : null

export const convertToJsonODataDate = date => {
  const time = new Date(date).getTime()
  return `/Date(${time})/`
}
