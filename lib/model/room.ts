/* eslint-disable no-underscore-dangle */
import { MutableRefObject } from 'react'
import { Socket } from 'socket.io-client'
import {
  MyMessage, MyProposalMessage, YourMessage, YourProposalMessage,
} from './entity/message'
import Message from './entity/message/base.entity'

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
  account: string
  bank: string
  coordTitle: string
  coordImg: string
  chatTime: string
  status: number
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
    this._lastChatTime = lastChatTime
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
    const timestamp = new Date().toISOString()
    const message = new MyMessage({
      content, timestamp,
    })
    this.messages.push(message)
    this._lastChat = message.content
    this._lastChatTime = message.timestamp
    this.update()
  }

  public sendEstimate(content: string, price: number, account: string, bank: string) {
    this.socketRef.current.emit('sendEstimate', {
      roomId: this.id,
      msg: content,
      price,
      account,
      bank,
    })
    const timestamp = new Date().toISOString()
    const message = new MyProposalMessage({
      content, price, account, bank, timestamp,
    })
    this.messages.push(message)
    this._lastChat = message.content
    this._lastChatTime = message.timestamp
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
    account,
    price,
    bank,
    coordTitle: title,
    coordImg: img,
    chatTime,
    status,
  }: RecieveMessageProps) {
    switch (type) {
      case 0:
        this.receiveMessage(id, message, chatTime)
        break
      case 1:
        this.receiveEstimate(id, message, price, account, bank, chatTime, status)
        break
      default:
        break
    }
    this.update()
  }

  private receiveMessage(id: number, content: string, timestamp: string) {
    const message = new YourMessage({ id, content, timestamp })
    this.messages.push(message)
    this._lastChat = message.content
    this._lastChatTime = message.timestamp
  }

  private receiveEstimate(
    id: number,
    content: string,
    price: number,
    account: string,
    bank: string,
    timestamp: string,
    status: number,
  ) {
    const message = new YourProposalMessage({
      id, content, price, account, bank, timestamp, status,
    })
    this.messages.push(message)
    this._lastChat = '코디 견적서가 도착했습니다'
    this._lastChatTime = message.timestamp
  }
}
