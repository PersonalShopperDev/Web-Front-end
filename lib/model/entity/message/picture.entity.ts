import CommonMessage, { CommonMessageProps } from './common.entity'

export interface PictureMessageProps extends CommonMessageProps {
  width: number,
  height: number,
}

export default class PictureMessage extends CommonMessage {
  public readonly width: number
  public readonly height: number

  constructor(props : PictureMessageProps) {
    const { width, height, ...superProps } = props
    super(superProps)
    this.width = width
    this.height = height
  }
}
