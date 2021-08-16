import { ReactNode } from 'react'
import styles from 'sass/components/chat/notice.module.scss'
import Icon from 'widgets/icon'

export default function Child({
  children,
} : {
  children: ReactNode,
}) {
  return (
    <figure className={styles.child}>
      <Icon src="notification.png" size={19} />
      <p className={styles.content}>
        {children}
      </p>
    </figure>
  )
}
