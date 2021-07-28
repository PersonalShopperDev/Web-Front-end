import { ReactNode } from 'react'
import styles from 'sass/components/progress/steps/index.module.scss'

export default function BaseStep({
  title,
  children,
} : {
  title: string,
  children: ReactNode
}) {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>
        {children}
      </div>
    </section>
  )
}
