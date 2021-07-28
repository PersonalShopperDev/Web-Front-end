import CommonMessage, { CommonMessageProps } from './common.entity'

export type NoticeProps = Omit<CommonMessageProps, 'userId'>

export default class NoticeMessage extends CommonMessage {
  constructor(props : NoticeProps) {
    super({ userId: -1, ...props })
  }
}
