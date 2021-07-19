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

interface Props {
  id: string | number,
  other: Other,
  lastChat?: string,
  lastChatTime?: string,
  socketRef: MutableRefObject<Socket>,
  update: () => void,
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
    lastChat,
    lastChatTime,
    socketRef,
    update,
  } : Props) {
    if (typeof id === 'string') {
      this.id = parseInt(id, 10)
      return
    }
    this.id = id
    this.other = other
    this._lastChat = lastChat
    this._lastChatTime = lastChatTime
    this.messages = []
    this.socketRef = socketRef
    this.update = update
  }

  public get lastChat() {
    return this._lastChat
  }

  public get lastChatTime() {
    return this._lastChatTime
  }

  public sendMessage(message: string) {
    this.socketRef.current.emit('sendMsg', { roomId: this.id, msg: message })
    this.messages.push(new MyMessage(message, new Date().toUTCString()))
    this._lastChat = message
    this._lastChatTime = new Date().toISOString()
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
    chatType: type,
    msg: message,
    price,
    coordTitle: title,
    coordImg: img,
    chatTime: timestamp,
  }: {
    chatType: number
    msg: string
    price: number
    coordTitle: string
    coordImg: ArrayBuffer
    chatTime: Date,
  }) {
    if (type === 0) {
      this.messages.push(new YourMessage(message, timestamp.toISOString()))
      this._lastChat = message
      this._lastChatTime = timestamp.toISOString()
    }
    this.update()
  }
}
