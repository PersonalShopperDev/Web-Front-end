import { useAuth } from 'providers/auth'
import { useRoom } from 'providers/chat/room'
import { ReactNode } from 'react'
import styles from 'sass/components/chat/speach-bubble/index.module.scss'
import Avatar from 'widgets/avatar'
import SpeachBubble from '.'

export interface SpeachBubbleContainerProps {
  userId: number
  image?: string
  timestamp: string
}

export default function SpeachBubbleContainer({
  userId,
  image,
  timestamp,
  children,
} : SpeachBubbleContainerProps & {
  timestamp: string
  children: ReactNode
}) {
  const { user } = useAuth()

  if (userId === user.userId) {
    return (
      <SpeachBubble
        ownerClassName={styles.my}
        timestamp={timestamp}
      >
        {children}
      </SpeachBubble>
    )
  }

  const { room } = useRoom()

  const { other } = room

  return (
    <SpeachBubble
      header={(
        <div className={styles.header}>
          <Avatar src={image} size={35} href={`/profile/${other.id}`} />
        </div>
      )}
      ownerClassName={styles.your}
      timestamp={timestamp}
    >
      {children}
    </SpeachBubble>
  )
}
