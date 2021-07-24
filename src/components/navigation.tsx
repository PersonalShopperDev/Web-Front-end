/* eslint-disable no-script-url */
import React from 'react'
import styles from 'sass/components/navigation.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navigation() {
  const router = useRouter()

  const isCurrentPath = (href: string) => {
    const { asPath } = router
    if (href === '/') {
      return asPath === href
    }
    return asPath.includes(href)
  }

  return (
    <div className={styles.container}>
      {navLists.map(({
        href, title, selectedPath, notSelectedPath,
      }) => (
        <Link href={href}>
          <a className={styles.itemContainer} href={href}>
            <img
              src={isCurrentPath(href) ? selectedPath : notSelectedPath}
              alt={title}
              width={18}
              height={18}
            />
            <span className={isCurrentPath(href) ? styles.selectedText : styles.notSelectedText}>
              {title}
            </span>
          </a>
        </Link>
      ))}
    </div>
  )
}

const navLists = [{
  title: '스타일매칭',
  selectedPath: '/icons/selectedNav1.png',
  notSelectedPath: '/icons/nav1.png',
  href: '/',
}, {
  title: '패션컨텐츠',
  selectedPath: '/icons/selectedNav2.png',
  notSelectedPath: '/icons/nav2.png',
  href: 'javascript:void(0)',
}, {
  title: '채팅',
  selectedPath: '/icons/selectedNav3.png',
  notSelectedPath: '/icons/nav3.png',
  href: '/chat',
}, {
  title: '스토어',
  selectedPath: '/icons/selectedNav4.png',
  notSelectedPath: '/icons/nav4.png',
  href: 'javascript:void(0)',
}, {
  title: 'MY프로필',
  selectedPath: '/icons/selectedNav5.png',
  notSelectedPath: '/icons/nav5.png',
  href: '/profile',
}]
