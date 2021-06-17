import React, { useState } from 'react'
import styles from 'sass/templates/onboarding/step.module.scss'
import Image from 'next/image'

export default function Step1() {
  const [option, setOption] = useState(-1)
  return (
    <section>
      <h1 className={styles.title}>STEP 1</h1>
      <h2 className={styles.content}>
        반가워요!
        <br />
        어떤 목적으로 퍼스널 쇼퍼를 사용하시나요?
      </h2>
      <div className={styles.step1Container}>
        <button
          type="button"
          onClick={() => setOption(0)}
          className={option === 0 ? styles.selectedStep1Box : styles.notSelectedStep1Box}
        >
          <div className={styles.image1}>
            <Image src="/icons/step1top.png" width="333" height="94" />
          </div>
          <span className={styles.firstLine}>코디를 받고 싶어요~!</span>
          <span>스타일리스트에게 코디를 받습니다.</span>
        </button>
        <button
          type="button"
          className={option === 1 ? styles.selectedStep1Box : styles.notSelectedStep1Box}
          onClick={() => setOption(1)}
        >
          <div className={styles.image2}>
            <Image src="/icons/step1bottom.png" width="333" height="94" />
          </div>
          <span className={styles.firstLine}>코디를 해주고 싶어요~!</span>
          <span>사용자에게 코디를 해줍니다.</span>
        </button>
      </div>
    </section>
  )
}
