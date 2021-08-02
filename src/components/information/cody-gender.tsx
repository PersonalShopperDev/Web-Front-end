import React from 'react'
import { useOnboarding } from 'providers/onboarding'
import styles from 'sass/components/cody-gender.module.scss'
import { genderType } from 'src/templates/onboarding/steps/step2'

export default function CodyGender({
  isOnboarding,
}: {
  isOnboarding?: boolean
}) {
  const { information, setData, setEdit } = useOnboarding()
  const genderLists: genderType[] = [{
    gender: 'supplyFemale',
    selectedPath: '/icons/selectedFemaleCareer.png',
    notSelectedPath: '/icons/femaleCareer.png',
    title: '여자',
  }, {
    gender: 'supplyMale',
    selectedPath: '/icons/selectedMaleCareer.png',
    notSelectedPath: '/icons/maleCareer.png',
    title: '남자',
  }]
  const onClickEach = (gender) => {
    setData(gender, !information[gender])
    if (!isOnboarding) setEdit('codyGender')
  }
  return (
    <div className={isOnboarding ? styles.container : styles.infoContainer}>
      {genderLists.map((value) => (
        <button
          type="button"
          className={styles.button}
          onClick={() => onClickEach(value.gender)}
          key={Math.random()}
        >
          {information[value.gender]
            ? <img src={value.selectedPath} alt="selectedIcons" className={styles.image} />
            : <img src={value.notSelectedPath} alt="icons" className={styles.image} />}
          <span className={information[value.gender]
            ? styles.selectedText : null}
          >
            {value.title}
          </span>
        </button>
      ))}
    </div>
  )
}

CodyGender.defaultProps = {
  isOnboarding: false,
}
