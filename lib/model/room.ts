import { MutableRefObject } from 'react'
import { Socket } from 'socket.io-client'
import Message from './entity/message.entity'
import MyMessage from './entity/my-message.entity'
import YourMessage from './entity/your-message.entity'

export default class Room {
  public readonly id: number
  public readonly users: number[]
  public readonly messages: Message[]
  private readonly socketRef: MutableRefObject<Socket>
  private readonly update: () => void

  constructor(
    id: string | number,
    users: number[],
    socketRef: MutableRefObject<Socket>,
    update: () => void,
  ) {
    if (typeof id === 'string') {
      this.id = parseInt(id, 10)
      return
    }
    this.id = id
    this.users = users
    this.messages = []
    this.socketRef = socketRef
    this.update = update
  }

  public sendMessage(message: string) {
    this.socketRef.current.emit('sendMsg', { roomId: this.id, msg: message })
    this.messages.push(new MyMessage(message, new Date().toUTCString()))
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
    }
    this.update()
  }
}
