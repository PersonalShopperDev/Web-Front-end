import React, { useState } from 'react'
import styles from 'sass/templates/onboarding/step4.module.scss'

export default function Step4() {
  const topLists = ['44사이즈', '55사이즈', '66사이즈', '77사이즈']
  const bottomLists = ['S사이즈', 'M사이즈', 'L사이즈']
  const shoulderLists = ['옷이 크다', '잘 맞는다', '옷이 작다']
  const waistLists = ['옷이 크다', '잘 맞는다', '옷이 작다']
  const middleLists = ['옷이 크다', '잘 맞는다', '옷이 작다']
  const hipLists = ['옷이 크다', '잘 맞는다', '옷이 작다']
  const [topSize, setTopSize] = useState('')
  const [bottomSize, setBottomSize] = useState('')
  const [shoulderSize, setShoulderSize] = useState('')
  const [waistSize, setWaistSize] = useState('')
  const [middleSize, setMiddleSize] = useState('')
  const [hipSize, setHipSize] = useState('')
  const sizeLists = [{
    title: '상의 사이즈',
    sizeLists: topLists,
    size: topSize,
    setSize: setTopSize,
  }, {
    title: '하의 사이즈',
    sizeLists: bottomLists,
    size: bottomSize,
    setSize: setBottomSize,
  }, {
    title: '어깨',
    sizeLists: shoulderLists,
    size: shoulderSize,
    setSize: setShoulderSize,
  }, {
    title: '허리',
    sizeLists: waistLists,
    size: waistSize,
    setSize: setWaistSize,
  }, {
    title: '배',
    sizeLists: middleLists,
    size: middleSize,
    setSize: setMiddleSize,
  }, {
    title: '엉덩이',
    sizeLists: hipLists,
    size: hipSize,
    setSize: setHipSize,
  }]
  return (
    <section>
      <div className={styles.step4}>
        <h1 className={styles.title}>STEP 4</h1>
        <h2 className={styles.content}>평소 의류 사이즈와 핏을 알려주세요</h2>
        <div className={styles.step4Container}>
          {sizeLists.map((value, index) => (
            <>
              <span className={styles.sizeText}>{value.title}</span>
              <div>
                {value.sizeLists.map((item) => (
                  <button
                    type="button"
                    className={item === value.size ? styles.selectedSize : styles.notSelectedSize}
                    onClick={() => value.setSize(item)}
                  >
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  )
}
