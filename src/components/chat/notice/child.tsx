import { ReactNode } from 'react'
import styles from 'sass/components/chat/notice-child.module.scss'
import Icon from 'widgets/icon'

export default function Child({
  children,
  bottom,
} : {
  children: ReactNode,
  bottom?: ReactNode,
}) {
  return (
    <figure className={styles.container}>
      <div className={styles.contentWrapper}>
        <Icon src="notification.png" size={19} />
        <p className={styles.content}>
          <b>안내:&nbsp;</b>
          {children}
        </p>
      </div>
      {bottom}
    </figure>
  )
}

Child.defaultProps = {
  bottom: null,
}
