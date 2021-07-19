import { useState, useEffect } from 'react'
import styles from 'sass/templates/stylist/profile.module.scss'
import BottomButton from 'src/components/bottom-button'
import ProfileDetail from 'src/components/profile-detail'
import CodyLookBook from 'src/components/cody-lookbook'
import Review from 'src/components/review'
import communicate from 'lib/api'
import parseJwt from 'lib/util/jwt'
import { ACCESS_TOKEN } from 'providers/auth'
import { getCookie } from 'lib/util/cookie'
import Avatar from 'widgets/avatar'

export default function Profile({
  id,
} : {
  id : number,
}) {
  const [info, setInfo] = useState(null)
  const [menu, setMenu] = useState(0)
  const menuLists = ['프로필', '코디룩북', '리뷰']
  const menuComponent = [<ProfileDetail info={info} />,
    <CodyLookBook id={id} />, <Review id={id} />]
  const [userId, setUserId] = useState()
  const onMatchingClick = () => {
  }
  const onMenuClick = (index) => {
    setMenu(index)
  }
  useEffect(() => {
    async function fetchProfileData() {
      const res = await communicate({ url: `/profile/${id}` })
      if (res.status !== 200) return
      const information = await res.json()
      setInfo(information)
    }
    fetchProfileData()
  }, [id])

  useEffect(() => {
    setUserId(parseJwt(getCookie(ACCESS_TOKEN)))
  }, [])

  return (
    <>
      {info != null
      && (
      <div className={styles.container}>
        <div className={styles.profileContainer}>
          <Avatar src={info.img} size={122} />
          <div className={styles.infoBox}>
            <span className={styles.name}>스타일리스트</span>
            <br />
            <span className={styles.name}>{info.name}</span>
            <div className={styles.category}>
              {info.styles.map((item) => (
                <div className={styles.styleBox} key={item}>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.menuContainer}>
          {menuLists.map((item, index) => (
            <button
              type="button"
              onClick={() => onMenuClick(index)}
              key={item}
            >
              <span className={menu === index
                ? styles.selectedMenu : styles.notSelectedMenu}
              >
                {item}
              </span>
            </button>
          ))}
        </div>
        { menuComponent[menu] }
          { (menu === 0 && userId !== id)
            && (
            <div className={styles.gradient}>
              <BottomButton text="채팅하기" onClick={onMatchingClick} />
            </div>
            )}
      </div>
      ) }

    </>
  )
}
