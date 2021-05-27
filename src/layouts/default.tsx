import React from 'react'
import styles from 'sass/layouts/default.module.scss'

export default function Layout({
  children,
  header,
  bottom,
}: {
  children: React.ReactNode
  header?: React.ReactNode
  bottom?: React.ReactNode
}) {
  return (
    <>
      {header && <header className={styles.header}>{header}</header>}
      <main className={styles.main}>{children}</main>
      {bottom && <section className={styles.bottom}>{bottom}</section>}
    </>
  )
}

Layout.defaultProps = {
  header: null,
  bottom: null,
}
