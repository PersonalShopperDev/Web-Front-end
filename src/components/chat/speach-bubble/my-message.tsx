import Message from './inner/message'
import MySpeachBubble from './my'

export default function MyMessageSpeachBubble({
  content,
  timestamp,
} : {
  content: string
  timestamp: string
}) {
  return (
    <MySpeachBubble timestamp={timestamp}>
      <Message owner="mine">{content}</Message>
    </MySpeachBubble>
  )
}
