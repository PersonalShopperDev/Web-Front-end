import React, {
  useEffect, MutableRefObject, useRef, useContext, createContext,
} from 'react'
import styles from 'sass/layouts/default.module.scss'

interface LayoutContextProps {
  mainRef: MutableRefObject<HTMLElement>
}

const LayoutContext = createContext<LayoutContextProps>(null)

export const useLayout = () => useContext(LayoutContext)

export default function Layout({
  children,
  header,
  bottom,
}: {
  children: React.ReactNode
  header?: React.ReactNode
  bottom?: React.ReactNode
}) {
  const mainRef = useRef<HTMLElement>()

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

  const value = {
    mainRef,
  }

  return (
    <LayoutContext.Provider value={value}>
      {header && <header className={styles.header}>{header}</header>}
      <main ref={mainRef} className={styles.main} id="main">{children}</main>
      {bottom && <section className={styles.bottom}>{bottom}</section>}
    </LayoutContext.Provider>
  )
}

Layout.defaultProps = {
  header: null,
  bottom: null,
}
