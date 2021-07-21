/* eslint-disable no-underscore-dangle */
import { MutableRefObject } from 'react'
import { Socket } from 'socket.io-client'
import Message from './entity/message.entity'
import MyMessage from './entity/my-message.entity'
import YourMessage from './entity/your-message.entity'

export interface Other {
  id: number,
  profileImg: string,
  name: string,
}

export interface RoomProps {
  id: string | number,
  other: Other,
  messages?: Message[]
  lastChat?: string,
  lastChatTime?: string,
  socketRef: MutableRefObject<Socket>,
  update: () => void,
}

export interface RecieveMessageProps {
  chatId: number
  chatType: number
  msg: string
  price: number
  coordTitle: string
  coordImg: string
  chatTime: Date
  status: boolean
}

export default class Room {
  public readonly id: number
  public readonly messages: Message[]
  public readonly other: Other
  private _lastChat: string
  private _lastChatTime: string
  private readonly socketRef: MutableRefObject<Socket>
  private readonly update: () => void

  constructor({
    id,
    other,
    messages,
    lastChat,
    lastChatTime,
    socketRef,
    update,
  } : RoomProps) {
    if (typeof id === 'string') {
      this.id = parseInt(id, 10)
    } else {
      this.id = id
    }
    this.other = other
    this._lastChat = lastChat
    this._lastChatTime = Message.GetTimestamp(new Date(lastChatTime))
    this.messages = messages || []
    this.socketRef = socketRef
    this.update = update
  }

  public get lastChat() {
    return this._lastChat
  }

  public get lastChatTime() {
    return this._lastChatTime
  }

  public sendMessage(content: string) {
    this.socketRef.current.emit('sendMsg', { roomId: this.id, msg: content })
    const date = new Date()
    const message = new MyMessage({
      id: -1, content, date,
    })
    this.messages.push(message)
    this._lastChat = message.content
    this._lastChatTime = message.timestamp
    this.update()
  }

  public sendEstimate(message: string, price: number, account: string, bank: string) {
    this.socketRef.current.emit('sendEstimate', {
      roomId: this.id,
      msg: message,
      price,
      account,
      bank,
    })
    this.update()
  }

  public sendCoord(title: string, image: ArrayBuffer) {
    this.socketRef.current.emit('sendCoord', {
      roomId: this.id,
      coordTitle: title,
      coordImg: image,
    })
    this.update()
  }

  public responseEstimate(value: boolean) {
    this.socketRef.current.emit('responseEstimate', { roomId: this.id, value })
    this.update()
  }

  public onPayment({ value }: { value: boolean }) {
    this.update()
  }

  public onResponseEstimate({ value }: { value: boolean }) {
    this.update()
  }

  public onReceive({
    chatId: id,
    chatType: type,
    msg: message,
    price,
    coordTitle: title,
    coordImg: img,
    chatTime,
    status,
  }: RecieveMessageProps) {
    const date = new Date(chatTime)
    switch (type) {
      case 0:
        this.receiveMessage(id, message, date)
        break
      default:
        break
    }
    this.update()
  }

  private receiveMessage(id: number, content: string, date: Date) {
    const message = new YourMessage({ id, content, date })
    this._lastChat = message.content
    this._lastChatTime = message.timestamp
  }
}
