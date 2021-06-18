import React, { useState } from 'react'
import styles from 'sass/templates/onboarding/step.module.scss'

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
  return (
    <section>
      <div className={styles.step4}>
        <h1 className={styles.title}>STEP 4</h1>
        <h2 className={styles.content}>평소 의류 사이즈와 핏을 알려주세요</h2>
        <div className={styles.step4Container}>
          <span className={styles.sizeText}>상의 사이즈</span>
          <div>
            {topLists.map((item) => (
              <button
                type="button"
                className={item === topSize ? styles.selectedSize : styles.notSelectedSize}
                onClick={() => setTopSize(item)}
              >
                <span>{item}</span>
              </button>
            ))}
          </div>
          <span className={styles.sizeText}>하의 사이즈</span>
          <div>
            {bottomLists.map((item) => (
              <button
                type="button"
                className={item === bottomSize ? styles.selectedSize : styles.notSelectedSize}
                onClick={() => setBottomSize(item)}
              >
                <span>{item}</span>
              </button>
            ))}
          </div>
          <span className={styles.sizeText}>어깨</span>
          <div>
            {shoulderLists.map((item) => (
              <button
                type="button"
                className={item === shoulderSize ? styles.selectedSize : styles.notSelectedSize}
                onClick={() => setShoulderSize(item)}
              >
                <span>{item}</span>
              </button>
            ))}
          </div>
          <span className={styles.sizeText}>허리</span>
          <div>
            {waistLists.map((item) => (
              <button
                type="button"
                className={item === waistSize ? styles.selectedSize : styles.notSelectedSize}
                onClick={() => setWaistSize(item)}
              >
                <span>{item}</span>
              </button>
            ))}
          </div>
          <span className={styles.sizeText}>배</span>
          <div>
            {middleLists.map((item) => (
              <button
                type="button"
                className={item === middleSize ? styles.selectedSize : styles.notSelectedSize}
                onClick={() => setMiddleSize(item)}
              >
                <span>{item}</span>
              </button>
            ))}
          </div>
          <span className={styles.sizeText}>엉덩이</span>
          <div>
            {hipLists.map((item) => (
              <button
                type="button"
                className={item === hipSize ? styles.selectedSize : styles.notSelectedSize}
                onClick={() => setHipSize(item)}
              >
                <span>{item}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
