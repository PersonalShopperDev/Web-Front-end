import React from 'react'
import styles from 'sass/components/demand-step4.module.scss'
import { Gender } from 'src/templates/onboarding/index'

export default function DemandStep4({
  gender,
  topSize,
  bottomSize,
  shoulderSize,
  waistSize,
  bellySize,
  hipSize,
  setTopSize,
  setBottomSize,
  setShoulderSize,
  setWaistSize,
  setBellySize,
  setHipSize,
}: {
    gender: Gender
    topSize: number
    bottomSize: number
    shoulderSize: number
    waistSize: number
    bellySize: number
    hipSize: number
    setTopSize: (value: number) => void
    setBottomSize: (value: number) => void
    setShoulderSize: (value: number) => void
    setWaistSize: (value: number) => void
    setBellySize: (value: number) => void
    setHipSize: (value: number) => void
}) {
  const femaleTopLists = ['44사이즈', '55사이즈', '66사이즈', '77사이즈']
  const maleTopLists = ['S사이즈', 'M사이즈', 'L사이즈', 'XL사이즈']
  const femaleBottomLists = ['S사이즈', 'M사이즈', 'L사이즈']
  const maleBottomLists = ['26~28', '29~31', '32~34']
  const shoulderLists = ['옷이 크다', '잘 맞는다', '옷이 작다']
  const waistLists = ['옷이 크다', '잘 맞는다', '옷이 작다']
  const bellyLists = ['옷이 크다', '잘 맞는다', '옷이 작다']
  const hipLists = ['옷이 크다', '잘 맞는다', '옷이 작다']

  const sizeLists = [{
    title: '상의 사이즈',
    sizeLists: gender === 'F' ? femaleTopLists : maleTopLists,
    size: topSize,
    setSize: setTopSize,
  }, {
    title: '하의 사이즈',
    sizeLists: gender === 'F' ? femaleBottomLists : maleBottomLists,
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
    sizeLists: bellyLists,
    size: bellySize,
    setSize: setBellySize,
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
        <div className={styles.container}>
          {sizeLists.map((value) => (
            <div key={Math.random()}>
              <span className={styles.sizeText}>{value.title}</span>
              <div>
                {value.sizeLists.map((item, index) => (
                  <button
                    type="button"
                    className={index === value.size ? styles.selectedSize : styles.notSelectedSize}
                    onClick={() => value.setSize(index)}
                    key={Math.random()}
                  >
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
