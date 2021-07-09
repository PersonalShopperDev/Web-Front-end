import { useRouter } from 'next/dist/client/router'
import React from 'react'
import styles from 'sass/components/app-bar.module.scss'
import Icon from 'widgets/icon'

export default function AppBar({
  title,
  landings,
  actions,
  back,
  backUrl,
} : {
  title? : React.ReactNode
  landings? : React.ReactNode[]
  actions? : React.ReactNode[]
  back? : boolean,
  backUrl?: string,
}) {
  const router = useRouter()

  const onClickBack = () => {
    if (backUrl) {
      router.push(backUrl)
      return
    }
    router.back()
  }

  return (
    <section className={styles.container}>
      <div className={styles.landings}>
        {landings?.map((landing) => landing)
        || (back && <Icon src="back.png" size={17} onClick={onClickBack} />)}
      </div>
      {title && <h1 className={styles.title}>{title}</h1>}
      <div className={styles.actions}>
        {actions?.map((action) => action)}
      </div>
    </section>
  )
}

AppBar.defaultProps = {
  title: null,
  landings: null,
  actions: null,
  back: false,
  backUrl: null,
}
