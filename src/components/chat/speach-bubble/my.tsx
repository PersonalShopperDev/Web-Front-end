import { cn } from 'lib/util'
import styles from 'sass/components/chat/speach-bubble/index.module.scss'

export default function MySpeachBubble({
  content,
  timestamp,
} : {
  content: string
  timestamp: string
}) {
  return (
    <figure className={cn(styles.container, styles.my)}>
      <div className={styles.inner}>
        <div className={cn(styles.body, styles.my)}>
          <p className={cn(styles.message, styles.my)}>{content}</p>
          <time className={styles.timestamp}>{timestamp}</time>
        </div>
      </div>
    </figure>
  )
}
