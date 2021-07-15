import Message from './message.entity'

export default class Room {
  public readonly id: number
  public readonly messages: Message[]
}
