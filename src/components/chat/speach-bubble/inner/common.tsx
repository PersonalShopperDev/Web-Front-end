import { cn } from 'lib/util'
import { ReactNode } from 'react'
import styles from 'sass/components/chat/speach-bubble/inner/message.module.scss'

export default function CommonMessage({
  children,
  className,
} : {
  children: ReactNode,
  className: string,
}) {
  return <p className={cn(className, styles.container)}>{children}</p>
}
