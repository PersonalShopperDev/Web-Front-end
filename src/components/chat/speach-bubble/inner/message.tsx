import { cn } from 'lib/util'
import { ReactNode } from 'react'
import styles from 'sass/components/chat/speach-bubble/inner/message.module.scss'

export default function Message({
  children,
  owner,
} : {
  children: ReactNode,
  owner: 'mine' | 'yours'
}) {
  return <p className={cn(styles.message, owner === 'mine' ? styles.my : styles.your)}>{children}</p>
}
