export default class Message {
  public readonly content: string
  public readonly timestamp: string
  constructor(content: string, timestamp: string) {
    this.content = content
    this.timestamp = timestamp
  }
}
