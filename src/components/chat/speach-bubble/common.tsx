import styles from 'sass/components/chat/speach-bubble/inner/message.module.scss'
import { useAuth } from 'providers/auth'
import { cn } from 'lib/util'
import CommonMessage from './inner/common'
import SpeachBubbleContainer, { SpeachBubbleContainerProps } from './container'

export interface CommonSpeachBubbleProps {
  content: string
}

export default function CommonSpeachBubble({
  userId,
  image,
  content,
  timestamp,
}: SpeachBubbleContainerProps & CommonSpeachBubbleProps) {
  const { user } = useAuth()

  return (
    <SpeachBubbleContainer userId={userId} image={image} timestamp={timestamp}>
      <CommonMessage
        className={cn(
          styles.message,
          userId === user.userId ? styles.my : styles.your,
        )}
      >
        {content}
      </CommonMessage>
    </SpeachBubbleContainer>
  )
}
