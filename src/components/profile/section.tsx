import React from 'react'
import styles from 'sass/components/profile/section.module.scss'

export default function Section({
  head,
  action,
  children,
} : {
  head: string
  action?: React.ReactNode,
  children: React.ReactNode
}) {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{head}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}

Section.defaultProps = {
  action: null,
}
