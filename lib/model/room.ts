/* eslint-disable no-underscore-dangle */
import { MutableRefObject } from 'react'
import { Socket } from 'socket.io-client'
import Message from './entity/message/base.entity'
import CommonMessage from './entity/message/common.entity'
import ProposalMessage from './entity/message/proposal.entity'

export interface Other {
  id: number,
  profileImg: string,
  name: string,
}

export interface RoomProps {
  id: string | number,
  userId: number,
  other: Other,
  messages?: RecieveMessageProps[]
  lastChat?: string,
  lastChatTime?: string,
  socketRef: MutableRefObject<Socket>,
  update: () => void,
}

export interface RecieveMessageProps {
  chatId: number
  userId: number
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
  public readonly userId: number
  public readonly other: Other
  private _messages: Message[]
  private _lastChat: string
  private _lastChatTime: string
  private readonly socketRef: MutableRefObject<Socket>
  private readonly update: () => void

  constructor({
    id,
    userId,
    messages,
    other,
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
    this.userId = userId
    this.other = other
    this._lastChat = lastChat
    this._lastChatTime = lastChatTime
    this._messages = []
    if (messages) {
      this.appendMessage(messages)
    }
    this.socketRef = socketRef
    this.update = update
  }

  public get messages() {
    return this._messages
  }

  public get lastChat() {
    return this._lastChat
  }

  public get lastChatTime() {
    return this._lastChatTime
  }

  private generateMessageId() {
    return -1 * this.messages[this.messages.length - 1].id - 1
  }

  public appendMessage(array : RecieveMessageProps[]) {
    const messages = array.map((props) => Room.createMessage(props))
    this._messages = [...messages, ...this._messages]
    this.update()
  }

  public sendMessage(content: string) {
    this.socketRef.current.emit('sendMsg', { roomId: this.id, msg: content })
    const timestamp = new Date().toISOString()
    const id = this.generateMessageId()
    const message = new CommonMessage({
      id, userId: this.userId, content, timestamp,
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
    const id = this.generateMessageId()
    const message = new ProposalMessage({
      id, content, price, account, bank, timestamp, userId: this.userId, status: 0,
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

  public onReceive(props: RecieveMessageProps) {
    const message = Room.createMessage(props)
    this.receiveMessage(message)
    this.update()
  }

  private receiveMessage(message: CommonMessage) {
    this.messages.push(message)
    this._lastChat = message.content
    this._lastChatTime = message.timestamp
  }

  private static createMessage({
    chatId: id,
    chatType: type,
    userId,
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
        return Room.createCommon(id, userId, message, chatTime)
      case 1:
        return Room.createProposal(id, userId, message, price, account, bank, chatTime, status)
      default:
        return null
    }
  }

  private static createCommon(id: number, userId: number, content: string, timestamp: string) {
    return new CommonMessage({
      id, content, timestamp, userId,
    })
  }

  private static createProposal(
    id: number,
    userId: number,
    content: string,
    price: number,
    account: string,
    bank: string,
    timestamp: string,
    status: number,
  ) {
    return new ProposalMessage({
      id, userId, content, price, account, bank, timestamp, status,
    })
  }
}
