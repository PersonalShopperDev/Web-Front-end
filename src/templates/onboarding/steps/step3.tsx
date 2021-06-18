import React, { useState } from 'react'
import styles from 'sass/templates/onboarding/step3.module.scss'

export default function Step3({
  nextStep,
  setNextStep,
}: {
  nextStep: boolean,
  setNextStep: (value: boolean) => void;
}) {
  const [bodyType, setBodyType] = useState(-1)
  const [skinType, setSkinType] = useState(-1)
  const bodyTypeLists = [{
    path: '/icons/bodyA.png',
    type: 'A.모래시계체형',
  }, {
    path: '/icons/bodyB.png',
    type: 'B.원형체형',
  }, {
    path: '/icons/bodyC.png',
    type: 'C.역삼각형체형',
  }, {
    path: '/icons/bodyD.png',
    type: 'D.삼각형체형',
  }, {
    path: '/icons/bodyE.png',
    type: 'E.사각형체형',
  }]
  const skinTypeLists = [{
    path: '/icons/skinA.png',
  }, {
    path: '/icons/skinB.png',
  }, {
    path: '/icons/skinC.png',
  }, {
    path: '/icons/skinD.png',
  }]
  return (
    <section>
      {!nextStep
        ? (
          <div className={styles.step3}>
            <h1 className={styles.title}>STEP 3-1</h1>
            <h2 className={styles.content}>다음 중 자신과 제일 유사한 체형을 골라주세요</h2>
            <div className={styles.step3Container}>
              {bodyTypeLists.map((value, index) => (
                <button
                  type="button"
                  className={bodyType === index ? styles.selectedBodyForm
                    : styles.notSelectedBodyForm}
                  onClick={() => setBodyType(index)}
                >
                  <div>
                    <img src={value.path} alt="bodyType" />
                  </div>
                  <span className={bodyType === index && styles.selectedText}>{value.type}</span>
                </button>
              ))}
            </div>
          </div>
        )
        : (
          <>
            <h1 className={styles.title}>STEP 3-2</h1>
            <h2 className={styles.content}>당신에게 적합한 톤을 알려주세요</h2>
            <h3 className={styles.subContent}>가장 마음에 드는 팔레트를 골라주세요.</h3>
            <div className={styles.paletteContainer}>
              {skinTypeLists.map((value, index) => (
                <button
                  type="button"
                  className={skinType === index
                    ? styles.selectedPalette : styles.notSelectedPalette}
                  onClick={() => setSkinType(index)}
                >
                  <img src={value.path} alt="skintype" className={styles.palette} />
                </button>
              ))}
            </div>
          </>
        )}
    </section>
  )
}
