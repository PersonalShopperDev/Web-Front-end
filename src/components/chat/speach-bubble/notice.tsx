import { cn } from 'lib/util'
import containerStyles from 'sass/components/chat/speach-bubble/index.module.scss'
import styles from 'sass/components/chat/speach-bubble/notice.module.scss'

interface NoticeSpeachBubbleProps {
  content: string
}

export default function NoticeSpeachBubble({
  content,
} : NoticeSpeachBubbleProps) {
  return (
    <figure className={cn(containerStyles.container, styles.container)}>
      <span className={styles.notice}>안내</span>
      <span className={styles.message}>{content}</span>
    </figure>
  )
}
