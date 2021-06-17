import React, { useState } from 'react'
import styles from 'sass/templates/onboarding/step.module.scss'
import Image from 'next/image'

export default function Step2() {
  const [gender, setGender] = useState(-1)
  return (
    <section>
      <h1 className={styles.title}>STEP 2</h1>
      <h2 className={styles.content}>당신의 성별을 알려주세요</h2>
      <div className={styles.step2Container}>
        <button
          type="button"
          className={styles.button}
          onClick={() => setGender(0)}
        >
          {gender === 0
            ? <Image src="/icons/selectedWoman.png" width="118" height="118" />
            : <Image src="/icons/woman.png" width="118" height="118" />}
          <span className={gender === 0 ? styles.selectedText : null}>여자</span>
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => setGender(1)}
        >
          {gender === 1
            ? <Image src="/icons/selectedMan.png" width="118" height="118" />
            : <Image src="/icons/man.png" width="118" height="118" />}
          <span className={gender === 1 ? styles.selectedText : null}>남자</span>
        </button>
      </div>
    </section>
  )
}
