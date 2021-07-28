/* eslint-disable no-underscore-dangle */
import { MutableRefObject } from 'react'
import { Socket } from 'socket.io-client'
import Message from './entity/message/base.entity'
import CommonMessage from './entity/message/common.entity'
import ProposalMessage from './entity/message/proposal.entity'
import CoordMessage from './entity/message/coord.entity'
import NoticeMessage from './entity/message/notice.entity'

export interface Other {
  id: number
  profileImg: string
  name: string
}

export interface LatestEstimate {
  estimateId: number,
  price: number,
  status: number,
}

export interface RoomProps {
  id: string | number
  userId: number
  other: Other
  messages?: RecieveMessageProps[]
  unreadCount: number
  lastChat?: string
  lastChatTime?: string
  latestEstimate?: LatestEstimate
  socketRef: MutableRefObject<Socket>
  update: () => void
}

export interface RecieveMessageProps {
  chatId: number
  userId: number
  chatType: number
  msg: string
  price: number
  account: string
  bank: string
  estimateId: number
  coordId: number
  coordTitle: string
  coordImg: string
  chatTime: string
  status: number
}

export default class Room {
  public readonly id: number
  public readonly userId: number
  public readonly other: Other
  public readonly latestEstimate: LatestEstimate
  private _messages: Message[]
  private _unreadCount: number
  private _lastChat: string
  private _lastChatTime: string
  private readonly socketRef: MutableRefObject<Socket>
  private readonly update: () => void

  constructor({
    id,
    userId,
    messages,
    other,
    unreadCount,
    lastChat,
    lastChatTime,
    latestEstimate,
    socketRef,
    update,
  }: RoomProps) {
    if (typeof id === 'string') {
      this.id = parseInt(id, 10)
    } else {
      this.id = id
    }
    this.userId = userId
    this.other = other
    this.latestEstimate = latestEstimate || {
      estimateId: undefined, price: undefined, status: undefined,
    }
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

  public initializeMessage(array: RecieveMessageProps[]) {
    if (!array) {
      return
    }
    if (array.length === 0) {
      return
    }
    this._messages = array.map((props) => Room.createMessage(props))
    this.update()
  }

  public initializeLatestEstimate({ estimateId, price, status } : LatestEstimate) {
    this.latestEstimate.estimateId = estimateId
    this.latestEstimate.price = price
    this.latestEstimate.status = status
  }

  public appendMessage(array: RecieveMessageProps[]) {
    const messages = array.map((props) => Room.createMessage(props))
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
    if (message instanceof CommonMessage) {
      this._lastChat = message.content
    }
    this._lastChatTime = message.timestamp
  }

  // public sendCoord(title: string, image: ArrayBuffer) {
  //   this.socketRef.current.emit('sendCoord', {
  //     roomId: this.id,
  //     coordTitle: title,
  //     coordImg: image,
  //   })
  //   this.update()
  // }

  public responseEstimate(id: number, value: boolean) {
    this.socketRef.current.emit('responseEstimate', { estimateId: id, value })
    // if (value) {
    //   this.sendMessage('수락되었습니다')
    // } else {
    //   this.sendMessage('거절되었습니다')
    // }
    // this.update()
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

  public pay(estimateId: number) {
    if (this.latestEstimate.estimateId !== estimateId) {
      return
    }

    let status : number

    for (let i = 0; i < this.messages.length; i++) {
      const message = this.messages[i]
      if (message instanceof ProposalMessage) {
        if (message.estimateId === estimateId) {
          status = message.status + 1
          message.setStatus(status)
          break
        }
      }
    }

    this.latestEstimate.status = status
    this.update()
  }

  public onChangeEstimateStatus({ estimateId, status }: { estimateId: number; status: number }) {
    for (let i = 0; i < this.messages.length; i++) {
      const message = this.messages[i]
      if (message instanceof ProposalMessage) {
        if (message.estimateId === estimateId) {
          message.setStatus(status)
          break
        }
      }
    }

    this.latestEstimate.estimateId = estimateId
    this.latestEstimate.status = status
    this.update()
  }

  public onReceive(props: RecieveMessageProps) {
    const message = Room.createMessage(props)
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

  private static createMessage({
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
    coordImg,
    chatTime,
    status,
  }: RecieveMessageProps) {
    switch (type) {
      case 0:
        return Room.createCommon(id, userId, message, chatTime)
      case 1:
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
      case 2:
        return Room.createCoord(
          id,
          userId,
          coordId,
          coordImg,
          coordTitle,
          chatTime,
        )
      case 5:
        return Room.createNotice(
          id,
          message,
          chatTime,
        )
      default:
        return null
    }
  }

  private static createCommon(
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

  private static createProposal(
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

  private static createCoord(
    id: number,
    userId: number,
    coordId: number,
    coordImg: string,
    coordTitle: string,
    timestamp: string,
  ) {
    return new CoordMessage({
      id,
      userId,
      coordId,
      coordImg,
      coordTitle,
      timestamp,
    })
  }

  private static createNotice(
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
