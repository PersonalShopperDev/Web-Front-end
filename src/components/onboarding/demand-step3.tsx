import React, { useEffect, useState } from 'react'
import styles from 'sass/components/demand-step3.module.scss'
import { Gender } from 'src/templates/onboarding/index'

export default function DemandStep3({
  nextStep,
  body,
  skin,
  gender,
  setBody,
  setSkin,
}: {
  nextStep: boolean,
  body: number,
  skin: number,
  gender: Gender,
  setBody: (value: number) => void;
  setSkin: (value: number) => void;
}) {
  const [bodyType, setBodyType] = useState(null)
  const femaleBodyTypeLists = [{
    path: '/icons/femaleBodyA.png',
    type: 'A.모래시계체형',
  }, {
    path: '/icons/femaleBodyB.png',
    type: 'B.원형체형',
  }, {
    path: '/icons/femaleBodyC.png',
    type: 'C.역삼각형체형',
  }, {
    path: '/icons/femaleBodyD.png',
    type: 'D.삼각형체형',
  }, {
    path: '/icons/femaleBodyE.png',
    type: 'E.사각형체형',
  }]
  const maleBodyTypeLists = [{
    path: '/icons/maleBodyA.png',
    type: 'A.슬림체형',
  }, {
    path: '/icons/maleBodyA.png',
    type: 'A.평균체형',
  }, {
    path: '/icons/maleBodyA.png',
    type: 'A.근육질체형',
  }, {
    path: '/icons/maleBodyA.png',
    type: 'A.지방형체형',
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
  useEffect(() => {
    if (gender === 'F') {
      setBodyType(femaleBodyTypeLists)
    } else {
      setBodyType(maleBodyTypeLists)
    }
  }, [])
  return (
    <section>
      {!nextStep
        ? (
          <div className={styles.step3}>
            <h1 className={styles.title}>STEP 3-1</h1>
            <h2 className={styles.content}>다음 중 자신과 제일 유사한 체형을 골라주세요</h2>
            <div className={styles.container}>
              {bodyType !== null && bodyType.map((value, index) => (
                <button
                  type="button"
                  className={body === index ? styles.selectedBodyForm
                    : styles.notSelectedBodyForm}
                  onClick={() => setBody(index)}
                  key={Math.random()}
                >
                  <div>
                    <img src={value.path} alt="bodyType" />
                  </div>
                  <span className={body === index
                    ? styles.selectedText : null}
                  >
                    {value.type}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )
        : (gender === 'F'
          && (
          <>
            <h1 className={styles.title}>STEP 3-2</h1>
            <h2 className={styles.content}>당신에게 적합한 톤을 알려주세요</h2>
            <h3 className={styles.subContent}>가장 마음에 드는 팔레트를 골라주세요.</h3>
            <div className={styles.paletteContainer}>
              {skinTypeLists.map((value, index) => (
                <button
                  type="button"
                  className={skin === index
                    ? styles.selectedPalette : styles.notSelectedPalette}
                  onClick={() => setSkin(index)}
                  key={Math.random()}
                >
                  <img src={value.path} alt="skintype" className={styles.palette} />
                </button>
              ))}
            </div>
          </>
          )
        )}
    </section>
  )
}
