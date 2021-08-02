import React from 'react'
import styles from 'sass/components/supply-step3.module.scss'
import { useOnboarding } from 'providers/onboarding'
import CodyGender from 'components/information/cody-gender'

export default function SupplyStep3() {
  const { information, setData } = useOnboarding()

  const onClickAll = () => {
    if (!information.supplyFemale) setData('supplyFemale', true)
    if (!information.supplyMale) setData('supplyMale', true)
  }
  return (
    <section>
      <h1 className={styles.title}>STEP 3</h1>
      <h2 className={styles.content}>누구에게 코디제안이 가능하신가요?</h2>
      <button type="button" onClick={onClickAll} className={styles.selectButton}>
        <span className={styles.text}>모두선택가능</span>
      </button>
      <CodyGender isOnboarding />
    </section>
  )
}
