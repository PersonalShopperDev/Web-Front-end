import { ReactNode } from 'react'
import styles from 'sass/components/review/before-after.module.scss'

export default function Wrapper({
  which,
  children,
} : {
  which: string,
  children: ReactNode
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        {children}
      </div>
      <div className={styles.which}>{which}</div>
    </div>
  )
}
