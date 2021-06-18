import React, { useState } from 'react'
import styles from 'sass/templates/onboarding/step.module.scss'
import Image from 'next/image'

export default function Step3({
  nextStep,
  setNextStep,
}: {
  nextStep: boolean,
  setNextStep: (value: boolean) => void;
}) {
  const [bodyType, setBodyType] = useState(-1)
  const [skinType, setSkinType] = useState(-1)
  return (
    <section>
      {!nextStep
        ? (
          <div className={styles.step3}>
            <h1 className={styles.title}>STEP 3-1</h1>
            <h2 className={styles.content}>다음 중 자신과 제일 유사한 체형을 골라주세요</h2>
            <div className={styles.step3Container}>
              <button
                type="button"
                className={bodyType === 0 ? styles.selectedBodyForm : styles.notSelectedBodyForm}
                onClick={() => setBodyType(0)}
              >
                <div className={styles.bodyA}>
                  <Image src="/icons/bodyA.png" width="139.48" height="284" />
                </div>
                <span className={bodyType === 0 ? styles.selectedText : null}>A.모래시계체형</span>
              </button>
              <button
                type="button"
                className={bodyType === 1 ? styles.selectedBodyForm : styles.notSelectedBodyForm}
                onClick={() => setBodyType(1)}
              >
                <div className={styles.bodyB}>
                  <Image src="/icons/bodyB.png" width="139.48" height="284" />
                </div>
                <span className={bodyType === 1 ? styles.selectedText : null}>B.원형체형</span>
              </button>
              <button
                type="button"
                className={bodyType === 2 ? styles.selectedBodyForm : styles.notSelectedBodyForm}
                onClick={() => setBodyType(2)}
              >
                <div className={styles.bodyC}>
                  <Image src="/icons/bodyC.png" width="139.48" height="284" />
                </div>
                <span className={bodyType === 2 ? styles.selectedText : null}>C.역삼각형체형</span>
              </button>
              <button
                type="button"
                className={bodyType === 3 ? styles.selectedBodyForm : styles.notSelectedBodyForm}
                onClick={() => setBodyType(3)}
              >
                <div className={styles.bodyD}>
                  <Image src="/icons/bodyD.png" width="144" height="284" />
                </div>
                <span className={bodyType === 3 ? styles.selectedText : null}>D.삼각형체형</span>
              </button>
              <button
                type="button"
                className={bodyType === 4 ? styles.selectedBodyForm : styles.notSelectedBodyForm}
                onClick={() => setBodyType(4)}
              >
                <div className={styles.bodyE}>
                  <Image src="/icons/bodyE.png" width="138.48" height="284" />
                </div>
                <span className={bodyType === 4 ? styles.selectedText : null}>E.사각형체형</span>
              </button>
            </div>
          </div>
        )
        : (
          <>
            <h1 className={styles.title}>STEP 3-2</h1>
            <h2 className={styles.content}>당신에게 적합한 톤을 알려주세요</h2>
            <h3 className={styles.subContent}>가장 마음에 드는 팔레트를 골라주세요.</h3>
            <div className={styles.paletteContainer}>
              <button
                type="button"
                className={skinType === 1 ? styles.selectedPalette : styles.notSelectedPalette}
                onClick={() => setSkinType(1)}
              >
                <Image src="/icons/skinA.png" width="90" height="90" />
              </button>
              <button
                type="button"
                className={skinType === 2 ? styles.selectedPalette : styles.notSelectedPalette}
                onClick={() => setSkinType(2)}
              >
                <Image src="/icons/skinB.png" width="90" height="90" />
              </button>
              <button
                type="button"
                className={skinType === 3 ? styles.selectedPalette : styles.notSelectedPalette}
                onClick={() => setSkinType(3)}
              >
                <Image src="/icons/skinC.png" width="90" height="90" />
              </button>
              <button
                type="button"
                className={skinType === 4 ? styles.selectedPalette : styles.notSelectedPalette}
                onClick={() => setSkinType(4)}
              >
                <Image src="/icons/skinD.png" width="90" height="90" />
              </button>
            </div>
          </>
        )}
    </section>
  )
}
