import { cn } from 'lib/util'
import convertTimestamp from 'lib/util/date'
import { ReactNode } from 'react'
import styles from 'sass/components/chat/speach-bubble/index.module.scss'

export default function SpeachBubble({
  header,
  children,
  timestamp,
  ownerClassName,
} : {
  header?: ReactNode
  children: ReactNode
  timestamp: string
  ownerClassName: string
}) {
  return (
    <figure className={cn(styles.container, ownerClassName)}>
      <div className={styles.inner}>
        {header}
        <div className={cn(styles.body, ownerClassName)}>
          {children}
          <time className={styles.timestamp}>{convertTimestamp(timestamp)}</time>
        </div>
      </div>
    </figure>
  )
}

SpeachBubble.defaultProps = {
  header: null,
}
