import { ReactNode } from 'react'
import styles from 'sass/components/review/section.module.scss'

export default function Section({
  head,
  children,
} : {
  head: string
  children: ReactNode
}) {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{head}</h2>
      {children}
    </section>
  )
}
