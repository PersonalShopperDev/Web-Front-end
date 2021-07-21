import { ReactNode } from 'react'
import styles from 'sass/components/chat/speach-bubble/index.module.scss'
import Avatar from 'widgets/avatar'
import SpeachBubble from '.'

export default function YourSpeachBubble({
  image,
  timestamp,
  children,
} : {
  image: string
  timestamp: string,
  children: ReactNode
}) {
  return (
    <SpeachBubble
      header={(
        <div className={styles.header}>
          <Avatar src={image} size={35} />
        </div>
      )}
      ownerClassName={styles.your}
      timestamp={timestamp}
    >
      {children}
    </SpeachBubble>
  )
}
