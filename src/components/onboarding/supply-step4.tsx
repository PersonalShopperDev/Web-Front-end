import React from 'react'
import styles from 'sass/components/supply-step4.module.scss'

export default function SupplyStep3({
  career,
  setCareer,
}: {
  career: number
  setCareer: (value: number) => void
}) {
  const careerLists = ['일반인', '스타일리스트(패션경력자)', '인플루언서(팔로우 만명이상)']
  const onClick = (index) => {
    setCareer(index)
  }
  return (
    <section>
      <div className={styles.step4}>
        <h1 className={styles.title}>STEP 4</h1>
        <h2 className={styles.content}>당신의 코디경력은 어떻게 되십니까?</h2>
      </div>
      <div className={styles.container}>
        {careerLists.map((item, index) => (
          <div key={Math.random()}>
            <div className={styles.careerListsContainer}>
              <button type="button" onClick={() => onClick(index)}>
                { career === index
                  ? <img src="/icons/selectedCheck.png" alt="selectedCheck" width="22" height="22" />
                  : <img src="/icons/check.png" alt="check" width="22" height="22" /> }
              </button>
              <span className={career === index
                ? styles.selectedText : null}
              >
                {item}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
