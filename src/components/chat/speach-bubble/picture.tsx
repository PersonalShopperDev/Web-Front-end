import styles from 'sass/components/chat/speach-bubble/inner/common.module.scss'
import { useAuth } from 'providers/auth'
import { cn } from 'lib/util'
import SpeachBubbleContainer, { SpeachBubbleContainerProps } from './container'
import PictureMessage from './inner/picture'

export interface PictureSpeachBubbleProps {
  src: string
}

export default function PictureSpeachBubble({
  userId,
  image,
  src,
  timestamp,
}: SpeachBubbleContainerProps & PictureSpeachBubbleProps) {
  const { user } = useAuth()

  return (
    <SpeachBubbleContainer userId={userId} image={image} timestamp={timestamp}>
      <PictureMessage
        src={src}
        className={cn(
          styles.message,
          userId === user.userId ? styles.my : styles.your,
        )}
      />
    </SpeachBubbleContainer>
  )
}
