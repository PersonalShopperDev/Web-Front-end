import { ReactNode } from 'react'
import styles from 'sass/templates/term.module.scss'

export default function Term({ children }: { children: ReactNode }) {
  return (
    <pre className={styles.container}>
      {children}
    </pre>
  )
}
