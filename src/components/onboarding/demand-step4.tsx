import React from 'react'
import styles from 'sass/components/demand-step4.module.scss'
import Size from 'components/information/size'

export default function DemandStep4() {
  return (
    <section>
      <h1 className={styles.title}>STEP 4</h1>
      <h2 className={styles.content}>평소 의류 사이즈와 핏을 알려주세요</h2>
      <div className={styles.container}>
        <Size isOnboarding />
      </div>
    </section>
  )
}
