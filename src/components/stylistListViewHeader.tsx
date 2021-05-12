import { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import styles from '../../sass/listup.module.scss'

export default function Header({
  isRanking,
  setIsRanking,
} : {
  isRanking: boolean,
  setIsRanking: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <div className={styles.header}>
      <div>
        <button type="button" className={!isRanking ? styles.selected : styles.notSelected} onClick={() => setIsRanking(false)}>모아보기</button>
        <button type="button" className={isRanking ? styles.selected : styles.notSelected} onClick={() => setIsRanking(true)}>순위보기</button>
      </div>
      <Image src="/images/icons/search.png" width="16.11" height="17" />
    </div>
  )
}
