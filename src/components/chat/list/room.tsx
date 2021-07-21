import Avatar from 'widgets/avatar'
import styles from 'sass/components/chat/list/friend.module.scss'
import Link from 'next/link'
import convertTimestamp from 'lib/util/date'

export default function Room({
  id,
  img,
  name,
  lastChat,
  lastChatTime,
} : {
  id: number,
  img: string,
  name: string,
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
          <p className={styles.message}>{lastChat}</p>
        </div>
      </a>
    </Link>
  )
}
