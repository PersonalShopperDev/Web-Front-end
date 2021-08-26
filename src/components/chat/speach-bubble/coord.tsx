import SpeachBubbleContainer, { SpeachBubbleContainerProps } from './container'
import Coord from './inner/coord'

export interface CoordSpeachBubbleProps {
  id: number
  coordImgList: string[]
  title: string
}

export default function CoordSpeachBubble({
  userId,
  id,
  coordImgList,
  image,
  title,
  timestamp,
}: SpeachBubbleContainerProps & CoordSpeachBubbleProps) {
  return (
    <SpeachBubbleContainer userId={userId} image={image} timestamp={timestamp}>
      <Coord
        id={id}
        imageList={coordImgList}
      >
        {title}
      </Coord>
    </SpeachBubbleContainer>
  )
}
