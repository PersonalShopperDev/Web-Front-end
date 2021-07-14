import React from 'react'
import styles from 'sass/components/career.module.scss'
import { useOnboarding } from 'providers/onboarding'

export default function Career({
  isOnboarding,
}: {
  isOnboarding?: boolean
}) {
  const { information, setData, setEdit } = useOnboarding()
  const careerLists = ['일반인', '스타일리스트(패션경력자)', '인플루언서(팔로우 만명이상)']
  const onClick = (index) => {
    setData('career', index)
    if (!isOnboarding) setEdit('career')
  }
  return (
    <div className={isOnboarding ? styles.container : styles.infoContainer}>
      {careerLists.map((item, index) => (
        <div key={Math.random()}>
          <button className={isOnboarding ? styles.careerListsContainer : styles.infoCareerLists} type="button" onClick={() => onClick(index)}>
            < >
              { information.career === index
                ? <img src="/icons/selectedCheck.png" alt="selectedCheck" width="22" height="22" />
                : <img src="/icons/check.png" alt="check" width="22" height="22" /> }
            </>
            <span className={information.career === index
              ? styles.selectedText : null}
            >
              {item}
            </span>
          </button>
        </div>
      ))}
    </div>
  )
}

Career.defaultProps = {
  isOnboarding: false,
}
