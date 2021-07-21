import Proposal from './inner/proposal'
import MySpeachBubble from './my'

export default function MyProposalSpeachBubble({
  content,
  price,
  timestamp,
} : {
  content: string
  price: number
  timestamp: string
}) {
  return (
    <MySpeachBubble timestamp={timestamp}>
      <Proposal price={price} owner="mine">
        {content}
      </Proposal>
    </MySpeachBubble>
  )
}
