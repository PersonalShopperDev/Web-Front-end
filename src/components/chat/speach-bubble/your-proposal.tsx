import Proposal from './inner/proposal'
import YourSpeachBubble from './your'

export default function YourProposalSpeachBubble({
  content,
  price,
  image,
  timestamp,
} : {
  content: string
  price: number
  image: string
  timestamp: string
}) {
  return (
    <YourSpeachBubble image={image} timestamp={timestamp}>
      <Proposal price={price} owner="yours">
        {content}
      </Proposal>
    </YourSpeachBubble>
  )
}
