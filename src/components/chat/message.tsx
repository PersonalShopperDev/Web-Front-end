import MessageProps from 'lib/model/entity/message/base.entity'
import CommonMessage from 'lib/model/entity/message/common.entity'
import CoordMessage from 'lib/model/entity/message/coord.entity'
import ProposalMessage from 'lib/model/entity/message/proposal.entity'
import { useRoom } from 'providers/chat/room'
import CommonSpeachBubble from './speach-bubble/common'
import CoordSpeachBubble from './speach-bubble/coord'
import ProposalSpeachBubble from './speach-bubble/proposal'

export default function Message({ message } : { message: MessageProps}) {
  const { room } = useRoom()

  const { profileImg } = room.other

  const { userId, timestamp } = message

  if (message instanceof CoordMessage) {
    const { coordId, coordTitle, coordImg } = message
    return (
      <CoordSpeachBubble
        id={coordId}
        userId={userId}
        title={coordTitle}
        coordImg={coordImg}
        timestamp={timestamp}
        image={profileImg}
      />
    )
  }

  if (message instanceof ProposalMessage) {
    const {
      price, content, estimateId, status,
    } = message
    return (
      <ProposalSpeachBubble
        id={estimateId}
        status={status}
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
