import Avatar from 'widgets/avatar'
import styles from 'sass/components/chat/list/friend.module.scss'
import Link from 'next/link'

export default function Room({
  id,
  img,
  name,
} : {
  id: number,
  img: string,
  name: string,
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
            <time className={styles.timestamp}>2021-3-9</time>
          </div>
          <p className={styles.message}>아무말</p>
        </div>
      </a>
    </Link>
  )
}
