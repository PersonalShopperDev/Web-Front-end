/* eslint-disable no-underscore-dangle */
import CommonMessage, { CommonMessageProps } from './common.entity'

export interface ProposalMessageProps extends CommonMessageProps {
  estimateId: number
  price: number
  account: string
  bank: string
  status: number
}

export default class ProposalMessage extends CommonMessage {
  public readonly estimateId: number
  public readonly price : number
  public readonly account: string
  public readonly bank: string
  private _status: number

  constructor({
    estimateId, price, account, bank, status, ...props
  } : ProposalMessageProps) {
    super(props)
    this.estimateId = estimateId
    this.price = price
    this.account = account
    this.bank = bank
    this._status = status
  }

  public get status() {
    return this._status
  }

  public setStatus(value: number) {
    this._status = value
  }
}
