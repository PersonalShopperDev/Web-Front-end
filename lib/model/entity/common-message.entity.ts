import Message, { MessageProps } from './message.entity'

export interface CommonMessageProps extends MessageProps {
  content: string,
  date: Date,
}

export default class CommonMessage extends Message {
  public readonly id: number
  public readonly content: string
  public readonly timestamp: string

  constructor({ content, date, ...props } : CommonMessageProps) {
    super(props)
    this.content = content
    this.timestamp = CommonMessage.GetTimestamp(date)
  }

  private static GetTimestamp(date: Date) {
    const hours = date.getHours()

    const meridiem = hours >= 12 ? '오후' : '오전'

    const minute = date.getMinutes()

    return `${meridiem} ${hours}:${minute.toString().padStart(2, '0')}`
  }
}
