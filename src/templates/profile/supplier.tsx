import { useState } from 'react'
import styles from 'sass/templates/users/profile.module.scss'
import BottomButton from 'src/components/bottom-button'
import ProfileDetail from 'src/components/profile-detail'
import CodyLookBook from 'src/components/cody-lookbook'
import Review from 'src/components/review'
import communicate from 'lib/api'
import { useAuth, User } from 'providers/auth'
import Avatar from 'widgets/avatar'
import { useAlert } from 'providers/dialog/alert/inner'
import ERROR_MESSAGE from 'lib/constants/error'
import { useRouter } from 'next/router'

export default function SupplierProfile({
  id,
  data,
  reviewId,
} : {
  id : number,
  data : User,
  reviewId?: number
}) {
  const router = useRouter()

  const [menu, setMenu] = useState(reviewId ? 2 : 0)

  const { user } = useAuth()
  const { userId, userType } = user

  const menuLists = ['프로필', '코디룩북', '리뷰']

  const menuComponent = [<ProfileDetail data={data} />,
    <CodyLookBook id={id} />, <Review id={id} reviewId={reviewId} />]

  const { createAlert } = useAlert()

  const onMatchingClick = async () => {
    const res = await communicate({
      url: '/chat',
      payload: {
        targetId: id,
      },
      method: 'POST',
    })

    if (res.status !== 200) {
      await createAlert({ text: ERROR_MESSAGE })
      return
    }

    const { roomId } = await res.json()

    router.push(`/chat/${roomId}`)
  }

  const onMenuClick = (index) => {
    setMenu(index)
  }

  if (!data) {
    return <></>
  }

  const { img, name, styles: styleList } = data

  return (
    <>
      <div className={styles.profileContainer}>
        <Avatar src={img} size={122} />
        <div className={styles.infoBox}>
          <span className={styles.name}>스타일리스트</span>
          <br />
          <span className={styles.name}>{name}</span>
          <div className={styles.category}>
            {styleList.map((item) => (
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
            className={styles.button}
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
      {(menu === 0 && userId !== id && userType === 'D') && (
        <div className={styles.gradient}>
          <BottomButton text="채팅하기" onClick={onMatchingClick} />
        </div>
      )}
    </>
  )
}

SupplierProfile.defaultProps = {
  reviewId: null,
}
