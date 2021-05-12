import { useState, useEffect } from 'react'
import styles from 'sass/navigation.module.scss'
import Image from 'next/image'

export default function Navigation() {
  const title: string = 'Personal Shopper'
  const menu: string[] = ['유빈', '현수', '진수', '호연', '세현']
  const [menuToggle, setMenuToggle] = useState(false)

  const scrollEventListner = () => (
    document.documentElement.scrollTop === 0
      ? document.getElementById('nav').classList.remove(styles.hideNav)
      : document.getElementById('nav').classList.add(styles.hideNav)
  )

  useEffect(() => {
    document.addEventListener('scroll', scrollEventListner)
    return () => document.removeEventListener('scroll', scrollEventListner)
  }, [])

  return (
    <div className={styles.navContainer} id="nav">
      <span className={styles.title}>{title}</span>
      <div className={menuToggle ? styles.menuContainer_active : styles.menuContainer} id="menu">
        {menu.map((item) => (
          <span className={styles.menu} key={item}>
            {item}
          </span>
        ))}
      </div>
      <button
        type="button"
        className={styles.menuIcon}
        onClick={() => setMenuToggle((prev) => !prev)}
      >
        {menuToggle ? (
          <Image src="/images/icons/Back.png" width="17" height="34" />
        ) : (
          <Image src="/images/icons/menu.png" width="35" height="26" />
        )}
      </button>
    </div>
  )
}

/*
import styles from '../../sass/listup.module.scss'
import Image from 'next/image';

interface Navigation {
    name: string,
    width: number,
    height: number,
    path: string,
}

export default function Navigation() {
    return (
        <div className={styles.footer}>
            {nav.map(item => {
                return (
                    <div className={styles.option} key={item.path}>
                        <Image src={item.path} width={item.width} height={item.height}/>
                        <span>{item.name}</span>
                    </div>
                )
            })}
        </div>
    )
}

const nav: Navigation[] = [{
    name: "홈",
    width: 24,
    height: 20,
    path: '/images/icons/home.png'
},{
    name: "스타일리스트",
    width: 18,
    height: 21,
    path: '/images/icons/stylist.png'
},{
    name: "채팅",
    width: 24,
    height: 22,
    path: '/images/icons/chat.png'
},{
    name: "좋아요",
    width: 23,
    height: 21,
    path: '/images/icons/like.png'
},{
    name: "마이페이지",
    width: 20,
    height: 20,
    path: '/images/icons/mypage.png'
},];
*/
