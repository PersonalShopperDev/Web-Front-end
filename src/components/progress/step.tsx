import { cn } from 'lib/util'
import { ReactNode } from 'react'
import styles from 'sass/components/progress/step.module.scss'

export default function Step({
  index,
  children,
  active,
}: {
  index: number
  children: ReactNode
  active: boolean
}) {
  return (
    <li className={styles.container}>
      <i className={cn(styles.index, active && styles.active)}>{index}</i>
      <span className={cn(styles.text, active && styles.active)}>{children}</span>
    </li>
  )
}
