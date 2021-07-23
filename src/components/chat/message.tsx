import MessageProps from 'lib/model/entity/message/base.entity'
import CommonMessage from 'lib/model/entity/message/common.entity'
import ProposalMessage from 'lib/model/entity/message/proposal.entity'
import { useRoom } from 'providers/chat/room'
import CommonSpeachBubble from './speach-bubble/common'
import ProposalSpeachBubble from './speach-bubble/proposal'

export default function Message({ message } : { message: MessageProps}) {
  const { room } = useRoom()

  const { profileImg } = room.other

  const { userId, timestamp } = message

  if (message instanceof ProposalMessage) {
    const { price, content, estimateId } = message
    return (
      <ProposalSpeachBubble
        id={estimateId}
        userId={userId}
        price={price}
        content={content}
        timestamp={timestamp}
        image={profileImg}
      />
    )
  }
  if (message instanceof CommonMessage) {
    const { content } = message
    return (
      <CommonSpeachBubble
        userId={userId}
        content={content}
        timestamp={timestamp}
        image={profileImg}
      />
    )
  }
  return null
}
