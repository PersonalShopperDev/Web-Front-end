import React from 'react'
import styles from 'sass/templates/onboarding/step2.module.scss'
import { useOnboarding } from 'providers/onboarding'

export interface genderType {
  gender: 'M' | 'F' | 'supplyFemale' | 'supplyMale',
  selectedPath: string,
  notSelectedPath: string,
  title: string,
}

export default function Step2() {
  const { information, setData } = useOnboarding()
  const onClick = (item) => {
    setData('gender', item)
  }
  const genderLists: genderType[] = [{
    gender: 'F',
    selectedPath: '/icons/selectedWoman.png',
    notSelectedPath: '/icons/woman.png',
    title: '여자',
  }, {
    gender: 'M',
    selectedPath: '/icons/selectedMan.png',
    notSelectedPath: '/icons/man.png',
    title: '남자',
  }]
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>STEP 2</h1>
      <h2 className={styles.content}>당신의 성별을 알려주세요</h2>
      <div className={styles.container}>
        {genderLists.map((value, index) => (
          <button
            type="button"
            className={styles.button}
            onClick={() => onClick(value.gender)}
            key={Math.random()}
          >
            {information.gender === value.gender
              ? <img src={value.selectedPath} alt="selectedIcons" className={styles.image} />
              : <img src={value.notSelectedPath} alt="icons" className={styles.image} />}
            <span className={information.gender === value.gender
              ? styles.selectedText : null}
            >
              {value.title}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
