import React, { useEffect, useState } from 'react'
import styles from 'sass/templates/users/list.module.scss'
import { useInfinityScroll } from 'providers/infinity-scroll'
import { useUserList } from 'providers/user-list'
import { useRouter } from 'next/router'
import Demander from 'components/user-list/demander'
import Supplier from 'components/user-list/supplier'

export default function List({ userType }) {
  const [gender, setGender] = useState('M')
  const {
    fetchUserData, setStyleType, setGenderType, setUserType,
  } = useUserList()
  const { setOnScrollFunc } = useInfinityScroll()
  const router = useRouter()

  const onClickBtn = (type) => {
    if (gender === type) return
    setGender(type)
    setGenderType(type)
  }
  useEffect(() => {
    setUserType(userType)
    setOnScrollFunc(fetchUserData)
    if (router.query.type !== undefined && userType === 'S') {
      const params = router.query.type.split('|')
      setStyleType(`${params.join('&styleType=')}`)
    }
  }, [])
  return (
    <div className={styles.listContainer}>
      {userType === 'D'
        ? (
          <>
            <div className={styles.header}>
              <button type="button" className={gender === 'M' ? styles.selectedBtn : styles.btn} onClick={() => onClickBtn('M')}>
                <span className={gender === 'M' ? styles.selected : null}>남자</span>
              </button>
              <button type="button" className={gender === 'F' ? styles.selectedBtn : styles.btn} onClick={() => onClickBtn('F')}>
                <span className={gender === 'F' ? styles.selected : null}>여자</span>
              </button>
            </div>
            <Demander />
          </>
        ) : <Supplier /> }
    </div>
  )
}
