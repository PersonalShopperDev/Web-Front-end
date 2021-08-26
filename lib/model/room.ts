/* eslint-disable no-underscore-dangle */
import { MutableRefObject } from 'react'
import { Socket } from 'socket.io-client'
import Message from './entity/message/base.entity'
import CommonMessage from './entity/message/common.entity'
import ProposalMessage from './entity/message/proposal.entity'
import CoordMessage from './entity/message/coord.entity'
import NoticeMessage from './entity/message/notice.entity'
import PictureMessage from './entity/message/picture.entity'

export interface Other {
  id: number
  profileImg: string
  name: string
}

export interface Payment {
  paymentId: number,
  price: number,
  status: number
  lastestCoordId: number
  requestEditCoordId: number
}

export interface RoomProps {
  id: string | number
  userId: number
  other: Other
  messages?: OnRecieveMessageProps[]
  unreadCount: number
  lastChat?: string
  lastChatTime?: string
  payment?: Payment
  socketRef: MutableRefObject<Socket>
  update: () => void
}

export interface OnRecieveMessageProps {
  chatId: number
  userId: number
  chatType: String
  msg: string
  price: number
  account: string
  bank: string
  estimateId: number
  coordId: number
  coordTitle: string
  coordImgList: string[]
  chatTime: string
  status: number
}

export default class Room {
  public readonly id: number
  public readonly userId: number
  public readonly other: Other
  private _messages: Message[]
  private _unreadCount: number
  private _lastChat: string
  private _lastChatTime: string
  private _payment: Payment
  private readonly socketRef: MutableRefObject<Socket>
  private readonly update: () => void

  public static readonly PICTURE_LAST_CHAT = '사진'

  constructor({
    id,
    userId,
    messages,
    other,
    unreadCount,
    lastChat,
    lastChatTime,
    socketRef,
    payment,
    update,
  }: RoomProps) {
    if (typeof id === 'string') {
      this.id = parseInt(id, 10)
    } else {
      this.id = id
    }
    this.userId = userId
    this.other = other
    this._payment = payment
    this._unreadCount = unreadCount
    this._lastChat = lastChat
    this._lastChatTime = lastChatTime
    this._messages = []
    this.socketRef = socketRef
    this.update = update
    if (messages) {
      this.appendMessage(messages)
    }
  }

  public get payment() {
    return this._payment
  }

  public get messages() {
    return this._messages
  }

  public get unreadCount() {
    return this._unreadCount
  }

  public get lastChat() {
    return this._lastChat
  }

  public get lastChatTime() {
    return this._lastChatTime
  }

  private generateMessageId() {
    return this._messages.length * Math.random()
  }

  public initializeStatus(payment: Payment) {
    this._payment = payment
  }

  public async initializeMessage(array: OnRecieveMessageProps[]) {
    if (!array) {
      return
    }
    if (array.length === 0) {
      return
    }
    this._messages = await Promise.all(array.map((props) => Room.createMessage(props)))
    this.update()
  }

  public async appendMessage(array: OnRecieveMessageProps[]) {
    const messages = await Promise.all(array.map((props) => Room.createMessage(props)))
    this._messages = [...messages, ...this._messages]
    this.update()
  }

  public sendMessage(content: string) {
    this.socketRef.current.emit('sendMsg', { roomId: this.id, msg: content })
    const timestamp = new Date().toISOString()
    const id = this.generateMessageId()
    const message = new CommonMessage({
      id,
      userId: this.userId,
      content,
      timestamp,
    })

    this.syncMessage(message)
    this.update()
  }

  public sendEstimate(
    content: string,
    price: number,
    account: string,
    bank: string,
  ) {
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
      id,
      estimateId: -1,
      content,
      price,
      account,
      bank,
      timestamp,
      userId: this.userId,
      status: 0,
    })
    this.syncMessage(message)
    this.update()
  }

  private syncMessage(message: Message) {
    this.messages.push(message)
    this._lastChatTime = message.timestamp
    if (message instanceof CoordMessage) {
      this._lastChat = message.coordTitle
    }
    if (message instanceof PictureMessage) {
      this._lastChat = Room.PICTURE_LAST_CHAT
    }
    if (message instanceof CommonMessage) {
      this._lastChat = message.content
    }
  }

  public responseEstimate(id: number, value: boolean) {
    this.socketRef.current.emit('responseEstimate', { estimateId: id, value })
  }

  public read() {
    this.socketRef.current.emit('readMsg', { roomId: this.id })
    this.messages.forEach((message) => {
      if (message.userId === this.userId) {
        return
      }
      // eslint-disable-next-line no-param-reassign
      message._isRead = true
    })
    this._unreadCount = 0
    this.update()
  }

  public onChangePayment(props : Payment) {
    this._payment = props
    this.update()
  }

  public async onReceive(props: OnRecieveMessageProps) {
    const message = await Room.createMessage(props)
    this.syncMessage(message)
    this._unreadCount += 1
    this.update()
  }

  public onRead() {
    this.messages.forEach((message) => {
      if (message.userId !== this.userId) {
        return
      }
      // eslint-disable-next-line no-param-reassign
      message._isRead = true
    })
    this.update()
  }

  private static async createMessage({
    chatId: id,
    chatType: type,
    userId,
    estimateId,
    msg: message,
    account,
    price,
    bank,
    coordId,
    coordTitle,
    coordImgList,
    chatTime,
    status,
  }: OnRecieveMessageProps) {
    switch (type) {
      case 'plain':
        return Room.createCommon(id, userId, message, chatTime)
      case '1':
        return Room.createProposal(
          id,
          userId,
          estimateId,
          message,
          price,
          account,
          bank,
          chatTime,
          status,
        )
      case 'coord':
        return Room.createCoord(
          id,
          userId,
          coordId,
          coordImgList,
          coordTitle,
          chatTime,
        )
      case 'notice':
        return Room.createNotice(
          id,
          message,
          chatTime,
        )
      case 'img':
        return Room.createPicture(
          id,
          userId,
          message,
          chatTime,
        )
      default:
        return null
    }
  }

  private static async createCommon(
    id: number,
    userId: number,
    content: string,
    timestamp: string,
  ) {
    return new CommonMessage({
      id,
      content,
      timestamp,
      userId,
    })
  }

  private static async createPicture(
    id: number,
    userId: number,
    content: string,
    timestamp: string,
  ) : Promise<PictureMessage> {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.onload = () => {
        const { width, height } = image
        resolve(new PictureMessage({
          id,
          width,
          height,
          content,
          timestamp,
          userId,
        }))
      }
      image.onerror = reject
      image.src = content
    })
  }

  private static async createProposal(
    id: number,
    userId: number,
    estimateId: number,
    content: string,
    price: number,
    account: string,
    bank: string,
    timestamp: string,
    status: number,
  ) {
    return new ProposalMessage({
      id,
      estimateId,
      userId,
      content,
      price,
      account,
      bank,
      timestamp,
      status,
    })
  }

  private static async createCoord(
    id: number,
    userId: number,
    coordId: number,
    coordImgList: string[],
    coordTitle: string,
    timestamp: string,
  ) {
    return new CoordMessage({
      id,
      userId,
      coordId,
      coordImgList,
      coordTitle,
      timestamp,
    })
  }

  private static async createNotice(
    id: number,
    content: string,
    timestamp: string,
  ) {
    return new NoticeMessage({
      id,
      content,
      timestamp,
    })
  }
}
