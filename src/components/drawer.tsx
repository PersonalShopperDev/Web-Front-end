import styles from 'sass/components/drawer.module.scss'
import Icon from 'widgets/icon'
import { ACCESS_TOKEN, useAuth } from 'providers/auth'
import parseJwt from 'lib/util/jwt'
import { getCookie } from 'lib/util/cookie'
import ModalLink from 'widgets/modal-link'
import Avatar from './app-bar/avatar'

export default function Drawer() {
  const { user, signOut } = useAuth()

  const { userType, name } = user || {}

  const token = getCookie(ACCESS_TOKEN)

  const { email } = parseJwt(token) || {}

  const getType = () => {
    if (userType === 'D') {
      return '일반 유저'
    }
    if (userType === 'S' || userType === 'W') {
      return '스타일리스트'
    }
    return null
  }
  const onSignOut = () => {
    signOut()
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.avatarWrapper}>
          <Avatar size={58} />
        </div>
        <div className={styles.detail}>
          <div className={styles.identity}>
            <h2 className={styles.name}>{name}</h2>
            <span className={styles.grade}>{getType()}</span>
          </div>
          <span className={styles.email}>{email}</span>
        </div>
      </div>
      <nav className={styles.navigation}>
        <ul className={styles.inner}>
          {categories.map(({ title, link }) => (
            <li key={title} className={styles.menu}>
              <ModalLink href={link} className={styles.link}>
                <span>{title}</span>
                <Icon src="drawer-arrow.png" size={16} />
              </ModalLink>
            </li>
          ))}
          <li key="logOut" className={styles.menu}>
            <button className={styles.signOut} type="button" onClick={onSignOut}>
              로그아웃
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

const categories = [
  // {
  //   title: '내 스크랩 보기',
  //   link: '/scrap',
  // },
  {
    title: '결제내역',
    link: '/history',
  },
  {
    title: '서비스 이용약관',
    link: '/term/service',
  },
  {
    title: '개인정보처리방침',
    link: '/term/privacy',
  },
  {
    title: '공지사항',
    link: '/notice',
  },
  // {
  //   title: 'FAQ',
  //   link: '/faq',
  // },
]
