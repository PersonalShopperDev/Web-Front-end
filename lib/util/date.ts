export default function convertTimestamp(timestamp: string) {
  const date = new Date(timestamp)

  const hours = date.getHours()

  const meridiem = hours >= 12 ? '오후' : '오전'

  const minute = date.getMinutes()

  return `${meridiem} ${hours}:${minute.toString().padStart(2, '0')}`
}
