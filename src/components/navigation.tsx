import React, { useState } from 'react'
import styles from 'sass/components/navigation.module.scss'
import Link from 'next/link'

export default function Navigation() {
  const [nav, setNav] = useState(0)
  const onButtonClick = (index: number) => {
    if (nav === index) return
    setNav(index)
  }
  return (
    <div className={styles.container}>
      {navLists.map((value, index) => (
        <Link href={value.href}>
          <button className={styles.itemContainer} type="button" onClick={() => onButtonClick(index)}>
            <img
              src={nav === index ? value.selectedPath : value.notSelectedPath}
              alt={value.title}
              width={18}
              height={18}
            />
            <span className={nav === index ? styles.selectedText : styles.notSelectedText}>
              {value.title}
            </span>
          </button>
        </Link>
      ))}
    </div>
  )
}

const navLists = [{
  title: '스타일매칭',
  selectedPath: '/icons/selectedNav1.png',
  notSelectedPath: '/icons/nav1.png',
  href: '/stylist',
}, {
  title: '패션컨텐츠',
  selectedPath: '/icons/selectedNav2.png',
  notSelectedPath: '/icons/nav2.png',
  href: 'fashion',
}, {
  title: '채팅',
  selectedPath: '/icons/selectedNav3.png',
  notSelectedPath: '/icons/nav3.png',
  href: '/chat',
}, {
  title: '스토어',
  selectedPath: '/icons/selectedNav4.png',
  notSelectedPath: '/icons/nav4.png',
  href: 'store',
}, {
  title: 'MY프로필',
  selectedPath: '/icons/selectedNav5.png',
  notSelectedPath: '/icons/nav5.png',
  href: '/profile',
}]
