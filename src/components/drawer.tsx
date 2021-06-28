import styles from 'sass/components/drawer.module.scss'
import Link from 'next/link'
import Icon from 'widgets/icon'
import { useAuth } from 'providers/auth'
import Avatar from './app-bar/avatar'

export default function Drawer() {
  const { signOut } = useAuth()

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
            <h2 className={styles.name}>김세현</h2>
            <span className={styles.grade}>일반유저</span>
          </div>
          <span className={styles.email}>alyssa071@naver.com</span>
        </div>
      </div>
      <nav className={styles.navigation}>
        <ul className={styles.inner}>
          {categories.map(({ title, link }) => (
            <li key={title} className={styles.menu}>
              <Link href={link}>
                <a className={styles.link} href={link}>
                  <span>{title}</span>
                  <Icon src="drawer-arrow.png" size={16} />
                </a>
              </Link>
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
  {
    title: '내 정보 변경하기',
    link: '/profile',
  },
  {
    title: '내 스크랩 보기',
    link: '/scrap',
  },
  {
    title: '결제내역',
    link: '/account',
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
  {
    title: 'FAQ',
    link: '/faq',
  },
]
