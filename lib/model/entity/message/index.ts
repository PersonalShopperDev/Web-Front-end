/* eslint-disable max-classes-per-file */
import CommonMessage, { CommonMessageProps } from './common.entity'
import ProposalMessage, { ProposalMessageProps } from './proposal.entity'

export class YourMessage extends CommonMessage {}

export class MyMessage extends CommonMessage {
  constructor(props: Omit<CommonMessageProps, 'id'>) {
    super({ id: -1, ...props })
  }
}

export class MyProposalMessage extends ProposalMessage {
  constructor(props: Omit<ProposalMessageProps, 'id' |'status'>) {
    super({ id: -1, status: 0, ...props })
  }
}

export class YourProposalMessage extends ProposalMessage {}
