import React from 'react'
import styles from 'sass/templates/onboarding/step1.module.scss'
import { useOnboarding } from 'providers/onboarding'

export default function Step1() {
  const { information, setData } = useOnboarding()
  const onClick = (item) => {
    setData('userType', item)
  }
  return (
    <section>
      <h1 className={styles.title}>STEP 1</h1>
      <h2 className={styles.content}>
        반가워요!
        <br />
        어떤 목적으로 퍼스널 쇼퍼를 사용하시나요?
      </h2>
      <div className={styles.contentBox}>
        <button
          type="button"
          onClick={() => onClick('D')}
          className={information !== null && information.userType === 'D' ? styles.selectedStep1Box : styles.notSelectedStep1Box}
        >
          <div className={styles.image1}>
            <img src="/icons/step1top.png" alt="user" className={styles.image} />
          </div>
          <span className={styles.firstLine}>코디를 받고 싶어요~!</span>
          <span>스타일리스트에게 코디를 받습니다.</span>
        </button>
        <button
          type="button"
          className={information !== null && information.userType === 'S' ? styles.selectedStep1Box : styles.notSelectedStep1Box}
          onClick={() => onClick('S')}
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
