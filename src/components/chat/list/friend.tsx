import Avatar from 'widgets/avatar'
import styles from 'sass/components/chat/list/friend.module.scss'

export default function Friend({
  img,
  name,
  timestamp,
  message,
}) {
  return (
    <figure className={styles.container}>
      <Avatar src={img} size={64} />
      <div className={styles.body}>
        <div className={styles.header}>
          <h3 className={styles.name}>{name}</h3>
          <time className={styles.timestamp}>{timestamp}</time>
        </div>
        <p className={styles.message}>{message}</p>
      </div>
    </figure>
  )
}
