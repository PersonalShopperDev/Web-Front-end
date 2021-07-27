import Message, { MessageProps } from './base.entity'

export interface CoordProps extends MessageProps {
  coordId: number
  coordImg: string
  coordTitle: string
}

export default class CoordMessage extends Message {
  public readonly coordId: number
  public readonly coordImg: string
  public readonly coordTitle: string

  constructor({
    coordId, coordImg, coordTitle, ...props
  } : CoordProps) {
    super(props)
    this.coordId = coordId
    this.coordImg = coordImg
    this.coordTitle = coordTitle
  }
}
