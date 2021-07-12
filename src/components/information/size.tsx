/* eslint-disable no-nested-ternary */
import React from 'react'
import styles from 'sass/components/size.module.scss'
import { useOnboarding } from 'providers/onboarding'

export default function Size({
  isOnboarding,
}: {
  isOnboarding?: boolean
}) {
  const { information, setData, setEdit } = useOnboarding()
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
    sizeLists: information.gender === 'F' ? femaleTopLists : maleTopLists,
    key: 'topSize',
  }, {
    title: '하의 사이즈',
    sizeLists: information.gender === 'F' ? femaleBottomLists : maleBottomLists,
    key: 'bottomSize',
  }, {
    title: '어깨',
    sizeLists: shoulderLists,
    key: 'shoulderSize',
  }, {
    title: '허리',
    sizeLists: waistLists,
    key: 'waistSize',
  }, {
    title: '배',
    sizeLists: bellyLists,
    key: 'bellySize',
  }, {
    title: '엉덩이',
    sizeLists: hipLists,
    key: 'hipSize',
  }]
  const onClick = (key, value) => {
    setData(key, value)
    if (!isOnboarding) setEdit('size')
  }
  return (
    <>
      {sizeLists.map((value) => (
        <div key={Math.random()}>
          <span className={isOnboarding ? styles.editSizeText : styles.editInfoSizeText}>
            {value.title}
          </span>
          <div className={styles.container}>
            {value.sizeLists.map((item, index) => (
              <div key={Math.random()}>
                <button
                  type="button"
                  className={index === information[value.key]
                    ? isOnboarding ? styles.editSize : styles.selectedSize : styles.notSelectedSize}
                  onClick={() => onClick(value.key, index)}
                >
                  <span>{item}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

Size.defaultProps = {
  isOnboarding: false,
}
