import SpeachBubbleContainer, { SpeachBubbleContainerProps } from './container'
import Coord from './inner/coord'

export interface CoordSpeachBubbleProps {
  id: number
  coordImg: string
  title: string
}

export default function CoordSpeachBubble({
  userId,
  id,
  coordImg,
  image,
  title,
  timestamp,
}: SpeachBubbleContainerProps & CoordSpeachBubbleProps) {
  return (
    <SpeachBubbleContainer userId={userId} image={image} timestamp={timestamp}>
      <Coord
        id={id}
        image={coordImg}
      >
        {title}
      </Coord>
    </SpeachBubbleContainer>
  )
}
