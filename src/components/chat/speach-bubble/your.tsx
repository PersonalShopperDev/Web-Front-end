import { cn } from 'lib/util'
import styles from 'sass/components/chat/speach-bubble/index.module.scss'
import Avatar from 'widgets/avatar'

export default function YourSpeachBubble({
  content,
  image,
  timestamp,
} : {
  content: string
  image: string
  timestamp: string,
}) {
  return (
    <figure className={cn(styles.container, styles.your)}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <Avatar src={image} size={35} />
        </div>
        <div className={cn(styles.body, styles.your)}>
          <p className={cn(styles.message, styles.your)}>{content}</p>
          <time className={styles.timestamp}>{timestamp}</time>
        </div>
      </div>
    </figure>
  )
}
