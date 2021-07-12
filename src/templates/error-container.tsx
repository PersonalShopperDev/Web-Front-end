import { ReactNode } from 'react'
import styles from 'sass/templates/error.module.scss'

export default function ErrorContainer({
  children,
}: {
  children: ReactNode
}) {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>{children}</h1>
    </section>
  )
}
