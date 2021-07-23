import Avatar from 'widgets/avatar'
import styles from 'sass/components/chat/list/room.module.scss'
import Link from 'next/link'
import convertTimestamp from 'lib/util/date'
import { cn } from 'lib/util'

export default function Room({
  id,
  img,
  name,
  unreadCount,
  lastChat,
  lastChatTime,
} : {
  id: number,
  img: string,
  name: string,
  unreadCount: number,
  lastChat: string,
  lastChatTime: string,
}) {
  return (
    <Link href={`/chat/${id}`}>
      <a className={styles.container} href={`/chat/${id}`}>
        <div className={styles.avatarWrapper}>
          <Avatar src={img} size={64} />
        </div>
        <div className={styles.body}>
          <div className={styles.header}>
            <h3 className={styles.name}>{name}</h3>
            <time className={styles.timestamp}>{convertTimestamp(lastChatTime)}</time>
          </div>
          <p className={cn(styles.message, unreadCount > 0 && styles.unread)}>{lastChat}</p>
        </div>
      </a>
    </Link>
  )
}
