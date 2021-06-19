import React, { useState } from 'react'
import styles from 'sass/templates/onboarding/step2.module.scss'

export default function Step2() {
  const [gender, setGender] = useState<string>(null)
  const genderLists = [{
    gender: 'female',
    selectedPath: '/icons/selectedWoman.png',
    notSelectedPath: '/icons/woman.png',
    title: '여자',
  }, {
    gender: 'male',
    selectedPath: '/icons/selectedMan.png',
    notSelectedPath: '/icons/man.png',
    title: '남자',
  }]
  return (
    <section>
      <h1 className={styles.title}>STEP 2</h1>
      <h2 className={styles.content}>당신의 성별을 알려주세요</h2>
      <div className={styles.container}>
        {genderLists.map((value, index) => (
          <button
            type="button"
            className={styles.button}
            onClick={() => setGender(value.gender)}
          >
            {gender === value.gender
              ? <img src={value.selectedPath} alt="selectedIcons" className={styles.image} />
              : <img src={value.notSelectedPath} alt="icons" className={styles.image} />}
            <span className={gender === value.gender && styles.selectedText}>{value.title}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
