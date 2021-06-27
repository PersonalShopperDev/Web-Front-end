import React, {
  Dispatch,
  SetStateAction,
} from 'react'
import styles from 'sass/components/supply-step3.module.scss'
import { genderType } from 'src/templates/onboarding/steps/step2'

export default function SupplyStep3({
  codyLists,
  setCodyLists,
}: {
  codyLists: Array<string>
  setCodyLists: Dispatch<SetStateAction<any>>
}) {
  const genderLists: genderType[] = [{
    gender: 'F',
    selectedPath: '/icons/selectedFemaleCareer.png',
    notSelectedPath: '/icons/femaleCareer.png',
    title: '여자',
  }, {
    gender: 'M',
    selectedPath: '/icons/selectedMaleCareer.png',
    notSelectedPath: '/icons/maleCareer.png',
    title: '남자',
  }]
  const onClickAll = () => {
    if (!codyLists.includes('F') && !codyLists.includes('M')) {
      setCodyLists([...codyLists, 'F', 'M'])
    } else if (!codyLists.includes('F')) {
      setCodyLists([...codyLists, 'F'])
    } else {
      setCodyLists([...codyLists, 'M'])
    }
  }
  const onClickEach = ({ gender }) => {
    if (!codyLists.includes(gender)) {
      setCodyLists([...codyLists, gender])
    } else {
      setCodyLists(codyLists.filter((item) => item !== gender))
    }
  }
  return (
    <section>
      <div className={styles.step3}>
        <h1 className={styles.title}>STEP 3</h1>
        <h2 className={styles.content}>어떤 성별에게 코디할건가요?</h2>
        <button type="button" onClick={onClickAll} className={styles.selectButton}>
          <span className={styles.text}>모두선택가능</span>
        </button>
        <div className={styles.container}>
          {genderLists.map((value, index) => (
            <button
              type="button"
              className={styles.button}
              onClick={() => onClickEach({ gender: value.gender })}
              key={Math.random()}
            >
              {codyLists.includes(value.gender)
                ? <img src={value.selectedPath} alt="selectedIcons" className={styles.image} />
                : <img src={value.notSelectedPath} alt="icons" className={styles.image} />}
              <span className={codyLists.includes(value.gender)
                ? styles.selectedText : null}
              >
                {value.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
