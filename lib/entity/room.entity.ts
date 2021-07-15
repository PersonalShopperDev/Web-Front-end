import Message from './message.entity'

export default class Room {
  public readonly id: number
  public readonly users: number[]
  public readonly messages: Message[]

  constructor(id : string | number, users: number[]) {
    if (typeof id === 'string') {
      this.id = parseInt(id, 10)
      return
    }
    this.id = id
    this.users = users
    this.messages = []
  }
}
