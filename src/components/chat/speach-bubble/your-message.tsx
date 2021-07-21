import Message from './inner/message'
import YourSpeachBubble from './your'

export default function YourMessageSpeachBubble({
  content,
  timestamp,
  image,
} : {
  content: string
  timestamp: string
  image: string
}) {
  return (
    <YourSpeachBubble image={image} timestamp={timestamp}>
      <Message owner="yours">{content}</Message>
    </YourSpeachBubble>
  )
}
