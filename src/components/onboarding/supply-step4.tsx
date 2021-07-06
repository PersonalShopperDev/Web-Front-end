import React from 'react'
import styles from 'sass/components/supply-step4.module.scss'
import Career from 'components/information/career'

export default function SupplyStep3() {
  return (
    <section>
      <div>
        <h1 className={styles.title}>STEP 4</h1>
        <h2 className={styles.content}>당신의 코디경력은 어떻게 되십니까?</h2>
      </div>
      <Career isEdit isOnboarding />
    </section>
  )
}
