import Proposal from './inner/proposal'
import SpeachBubbleContainer, { SpeachBubbleContainerProps } from './container'
import { CommonSpeachBubbleProps } from './common'

interface ProposalSpeachBubbleProps extends CommonSpeachBubbleProps {
  id: number
  price: number
}

export default function ProposalSpeachBubble({
  id,
  userId,
  image,
  content,
  price,
  timestamp,
} : SpeachBubbleContainerProps & ProposalSpeachBubbleProps) {
  return (
    <SpeachBubbleContainer userId={userId} image={image} timestamp={timestamp}>
      <Proposal id={id} price={price}>
        {content}
      </Proposal>
    </SpeachBubbleContainer>
  )
}
