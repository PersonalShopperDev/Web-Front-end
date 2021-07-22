/* eslint-disable no-underscore-dangle */
export interface MessageProps {
  id: number
  userId: number
  timestamp: string,
  isRead?: boolean
}

export default class Message {
  public readonly id : number
  public readonly userId: number
  public readonly timestamp: string
  public _isRead : boolean

  constructor({
    id, userId, timestamp, isRead = false,
  } : MessageProps) {
    this.id = id
    this.userId = userId
    this.timestamp = timestamp
    this._isRead = isRead
  }

  public get isRead() {
    return this._isRead
  }
}
