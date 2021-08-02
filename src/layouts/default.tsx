import React, { useEffect } from 'react'
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
  useEffect(() => {
    const root = document.getElementById('__next')

    const resize = () => {
      root.style.height = `${window.innerHeight}px`
    }

    resize()

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      {header && <header className={styles.header}>{header}</header>}
      <main className={styles.main} id="main">{children}</main>
      {bottom && <section className={styles.bottom}>{bottom}</section>}
    </>
  )
}

Layout.defaultProps = {
  header: null,
  bottom: null,
}
