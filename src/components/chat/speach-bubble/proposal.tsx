import Proposal from './inner/proposal'
import SpeachBubbleContainer, { SpeachBubbleContainerProps } from './container'
import { CommonSpeachBubbleProps } from './common'

interface ProposalSpeachBubbleProps extends CommonSpeachBubbleProps {
  price: number
}

export default function ProposalSpeachBubble({
  userId,
  image,
  content,
  price,
  timestamp,
} : SpeachBubbleContainerProps & ProposalSpeachBubbleProps) {
  return (
    <SpeachBubbleContainer userId={userId} image={image} timestamp={timestamp}>
      <Proposal price={price}>
        {content}
      </Proposal>
    </SpeachBubbleContainer>
  )
}
