import { useState } from 'react'
import Image from 'next/image'
import styles from 'sass/templates/stylist/profile.module.scss'
import { StylistInfo } from 'src/components/stylistBox'
import BottomButton from 'src/components/bottomButton'
import ProfileDetail from 'src/components/profileDetail'
import CodyLookBook from 'src/components/codyLookBook'
import Review from 'src/components/review'

export default function Profile({
  info,
} : {
  info : StylistInfo,
}) {
  const isBadge = true
  const [menu, setMenu] = useState(0)
  const menuComponent = [<ProfileDetail info={info} />,
    <CodyLookBook cody={info.photoList} />, <Review info={info} />]
  const onButtonClick = () => {

  }
  return (
    <>
      <div className={styles.profileContainer}>
        <Image src={info.profileImg} width="141" height="141" className={styles.profileImg} />
        <div className={styles.infoBox}>
          <span className={styles.name}>Stylist</span>
          <br />
          <span className={styles.name}>{info.name}</span>
          { isBadge ? <Image src="/icons/badge.png" width="23" height="23" /> : null }
          <div className={styles.category}>
            {info.style.map((item) => <div className={styles.styleBox}><span>{item}</span></div>)}
          </div>
        </div>
      </div>
      <div className={styles.menuContainer}>
        <button type="button" onClick={() => setMenu(0)}>
          <span className={menu === 0 ? styles.selectedMenu : styles.notSelectedMenu}>프로필</span>
        </button>
        <button type="button" onClick={() => setMenu(1)}>
          <span className={menu === 1 ? styles.selectedMenu : styles.notSelectedMenu}>코디룩북</span>
        </button>
        <button type="button" onClick={() => setMenu(2)}>
          <span className={menu === 2 ? styles.selectedMenu : styles.notSelectedMenu}>리뷰</span>
        </button>
      </div>
      { menuComponent[menu] }
      {menu === 0 ? <BottomButton text="매칭하기" onClick={onButtonClick} /> : null }
    </>
  )
}
