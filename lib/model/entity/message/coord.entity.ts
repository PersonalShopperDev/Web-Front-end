import Message, { MessageProps } from './base.entity'

export interface CoordProps extends MessageProps {
  coordId: number
  coordImgList: string[]
  coordTitle: string
}

export default class CoordMessage extends Message {
  public readonly coordId: number
  public readonly coordImgList: string[]
  public readonly coordTitle: string

  constructor({
    coordId, coordImgList, coordTitle, ...props
  } : CoordProps) {
    super(props)
    this.coordId = coordId
    this.coordImgList = coordImgList
    this.coordTitle = coordTitle
  }
}
