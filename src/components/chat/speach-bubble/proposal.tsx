import Proposal from './inner/proposal'
import SpeachBubbleContainer, { SpeachBubbleContainerProps } from './container'
import { CommonSpeachBubbleProps } from './common'

interface ProposalSpeachBubbleProps extends CommonSpeachBubbleProps {
  id: number
  status: number
  price: number
}

export default function ProposalSpeachBubble({
  id,
  userId,
  status,
  image,
  content,
  price,
  timestamp,
} : SpeachBubbleContainerProps & ProposalSpeachBubbleProps) {
  return (
    <SpeachBubbleContainer userId={userId} image={image} timestamp={timestamp}>
      <Proposal id={id} price={price} status={status}>
        {content}
      </Proposal>
    </SpeachBubbleContainer>
  )
}
