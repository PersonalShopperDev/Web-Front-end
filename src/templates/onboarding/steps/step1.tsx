import React, { useState } from 'react'
import styles from 'sass/templates/onboarding/step1.module.scss'

type Purpose = 'user' | 'stylist'

export default function Step1() {
  const [purpose, setPurpose] = useState<Purpose>(null)
  const onClick = (item) => {
    setPurpose(item)
  }
  return (
    <section>
      <h1 className={styles.title}>STEP 1</h1>
      <h2 className={styles.content}>
        반가워요!
        <br />
        어떤 목적으로 퍼스널 쇼퍼를 사용하시나요?
      </h2>
      <div className={styles.container}>
        <button
          type="button"
          onClick={() => onClick('user')}
          className={purpose === 'user' ? styles.selectedStep1Box : styles.notSelectedStep1Box}
        >
          <div className={styles.image1}>
            <img src="/icons/step1top.png" alt="user" className={styles.image} />
          </div>
          <span className={styles.firstLine}>코디를 받고 싶어요~!</span>
          <span>스타일리스트에게 코디를 받습니다.</span>
        </button>
        <button
          type="button"
          className={purpose === 'stylist' ? styles.selectedStep1Box : styles.notSelectedStep1Box}
          onClick={() => onClick('stylist')}
        >
          <div className={styles.image2}>
            <img src="/icons/step1bottom.png" alt="stylist" className={styles.image} />
          </div>
          <span className={styles.firstLine}>코디를 해주고 싶어요~!</span>
          <span>사용자에게 코디를 해줍니다.</span>
        </button>
      </div>
    </section>
  )
}
