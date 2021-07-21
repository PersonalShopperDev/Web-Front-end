/* eslint-disable no-underscore-dangle */
import CommonMessage, { CommonMessageProps } from './common-message.entity'

export interface ProposalMessageProps extends CommonMessageProps {
  price: number
  account: string
  bank: string
  status: boolean
}

export default class ProposalMessage extends CommonMessage {
  public readonly price : number
  public readonly account: string
  public readonly bank: string
  private _status: boolean

  constructor({
    price, account, bank, status, ...props
  } : ProposalMessageProps) {
    super(props)
    this.price = price
    this.account = account
    this.bank = bank
    this._status = status
  }

  public get status() {
    return this._status
  }
}
