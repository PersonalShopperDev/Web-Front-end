/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
import styles from 'sass/components/body.module.scss'
import { useOnboarding } from 'providers/onboarding'

export default function Body({
  isEdit,
  isOnboarding,
}: {
  isEdit?: boolean
  isOnboarding?: boolean
}) {
  const { information, setData, editCheck } = useOnboarding()
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
    type: 'B.평균체형',
  }, {
    path: '/icons/maleBodyA.png',
    type: 'C.근육질체형',
  }, {
    path: '/icons/maleBodyA.png',
    type: 'D.지방형체형',
  }]
  const onBodyClick = (item) => {
    setData('body', item)
  }
  useEffect(() => {
    if (information.gender === 'F') {
      setBodyType(femaleBodyTypeLists)
    } else {
      setBodyType(maleBodyTypeLists)
    }
  }, [])
  return (
    <div className={isOnboarding ? styles.container : styles.infoContainer}>
      {bodyType !== null && bodyType.map((value, index) => (
        <div key={Math.random()}>
          {isEdit || editCheck.body
            ? (
              <button
                type="button"
                className={isOnboarding ? (information.body === index
                  ? styles.selectedBodyForm
                  : styles.notSelectedBodyForm) : (information.body === index
                  ? styles.infoSelectedBodyForm : styles.infoNotSelectedBodyForm)}
                onClick={() => onBodyClick(index)}
              >
                <div>
                  <img src={value.path} alt="bodyType" />
                </div>
                <span className={information.body === index
                  ? styles.selectedText : null}
                >
                  {value.type}
                </span>
              </button>
            ) : (
              <div
                className={isOnboarding ? (information.body === index
                  ? styles.selectedBodyForm
                  : styles.notSelectedBodyForm) : (information.body === index
                  ? styles.infoSelectedBodyForm : styles.infoNotSelectedBodyForm)}
              >
                <div>
                  <img src={value.path} alt="bodyType" />
                </div>
                <span className={information.body === index
                  ? styles.selectedText : null}
                >
                  {value.type}
                </span>
              </div>
            ) }
        </div>
      ))}
    </div>
  )
}

Body.defaultProps = {
  isOnboarding: false,
  isEdit: false,
}
