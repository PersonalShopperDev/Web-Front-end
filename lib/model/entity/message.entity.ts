/* eslint-disable no-underscore-dangle */
export interface MessageProps {
  id: number
  date: Date,
  isRead?: boolean
}

export default class Message {
  public readonly id : number
  public readonly timestamp: string
  public _isRead : boolean

  constructor({ id, date, isRead = false } : MessageProps) {
    this.id = id
    this.timestamp = Message.GetTimestamp(date)
    this._isRead = isRead
  }

  public get isRead() {
    return this._isRead
  }

  public static GetTimestamp(date: Date) {
    const hours = date.getHours()

    const meridiem = hours >= 12 ? '오후' : '오전'

    const minute = date.getMinutes()

    return `${meridiem} ${hours}:${minute.toString().padStart(2, '0')}`
  }
}
