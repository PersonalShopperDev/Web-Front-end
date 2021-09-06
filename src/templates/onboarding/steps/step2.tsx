import React, { useState, useEffect } from 'react'
import styles from 'sass/templates/onboarding/step2.module.scss'
import { useOnboarding } from 'providers/onboarding'
import communicate from 'lib/api'

export interface genderType {
  gender: 'M' | 'F' | 'supplyFemale' | 'supplyMale',
  selectedPath: string,
  notSelectedPath: string,
  title: string,
}

export default function Step2({
  nextStep,
}: {
  nextStep: boolean
}) {
  const { information, setData } = useOnboarding()
  const [nickName, setNickName] = useState('')
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

  const onClickNickName = async () => {
    const res = await communicate({ url: '/onboard/nickname' })
    if (res.status === 200) {
      const data = await res.text()
      setNickName(data)
      setData('name', data)
    }
  }

  useEffect(() => {
    onClickNickName()
  }, [])

  return (
    <section className={styles.section}>
      {!nextStep
        ? (
          <>
            <h1 className={styles.title}>STEP 2-1</h1>
            <h2 className={styles.content}>당신의 성별을 알려주세요.</h2>
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
          </>
        )
        : (
          <>
            <h1 className={styles.title}>STEP 2-2</h1>
            <h2 className={styles.content}>활동할 닉네임을 정해주세요.</h2>
            <div className={styles.nextContainer}>
              <img src={genderLists[information.gender === 'F' ? 0 : 1].selectedPath} alt="selectedIcons" className={styles.img} />
              <div className={styles.nickNameBox}>
                <div>
                  닉네임
                  <span className={styles.nickName}>{nickName}</span>
                </div>
                <button
                  type="button"
                  className={styles.anotherBox}
                  onClick={onClickNickName}
                >
                  <span>다른 닉네임</span>
                </button>
              </div>
              <span className={styles.subtext}>* 이후 마이프로필에서 변경 가능합니다.</span>
            </div>
          </>
        ) }
    </section>
  )
}
