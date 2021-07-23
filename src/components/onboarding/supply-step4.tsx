import React from 'react'
import styles from 'sass/components/supply-step4.module.scss'
import Career from 'components/information/career'

export default function SupplyStep3() {
  return (
    <section>
      <div>
        <h1 className={styles.title}>STEP 4</h1>
        <h2 className={styles.content}>코디경력이 어떻게 되시나요?</h2>
      </div>
      <Career isOnboarding />
    </section>
  )
}
