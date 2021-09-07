import Link from 'next/link'
import Icon from 'widgets/icon'
import styles from 'sass/components/chat/push-link.module.scss'

export default function PushLink() {
  return (
    <Link href="/profile">
      <a className={styles.container} href="/chat/push">
        <span className={styles.message}>원활한 서비스를 위한 채팅 알람 받기</span>
        <Icon src="right-arrow-white.png" size={14} />
      </a>
    </Link>
  )
}
