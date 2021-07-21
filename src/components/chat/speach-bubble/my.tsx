import { ReactNode } from 'react'
import styles from 'sass/components/chat/speach-bubble/index.module.scss'
import SpeachBubble from '.'

export default function MySpeachBubble({
  timestamp,
  children,
} : {
  timestamp: string
  children: ReactNode
}) {
  return (
    <SpeachBubble
      ownerClassName={styles.my}
      timestamp={timestamp}
    >
      {children}
    </SpeachBubble>
  )
}
