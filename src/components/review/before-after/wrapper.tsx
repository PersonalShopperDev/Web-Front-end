import { ReactNode } from 'react'
import styles from 'sass/components/review/before-after.module.scss'

export default function Wrapper({
  name,
  children,
} : {
  name: string,
  children: ReactNode
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        {children}
      </div>
      <div className={styles.which}>{name}</div>
    </div>
  )
}
