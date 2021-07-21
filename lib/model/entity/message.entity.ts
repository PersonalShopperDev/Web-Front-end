/* eslint-disable no-underscore-dangle */
export interface MessageProps {
  id: number
  isRead?: boolean
}

export default class Message {
  public readonly id : number
  public _isRead : boolean

  constructor({ id, isRead = false } : MessageProps) {
    this.id = id
    this._isRead = isRead
  }

  public get isRead() {
    return this._isRead
  }
}