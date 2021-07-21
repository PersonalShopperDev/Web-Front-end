import Message, { MessageProps } from './message.entity'

export interface CommonMessageProps extends MessageProps {
  content: string,
}

export default class CommonMessage extends Message {
  public readonly content: string

  constructor({ content, ...props } : CommonMessageProps) {
    super(props)
    this.content = content
  }
}
