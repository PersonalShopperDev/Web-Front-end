/* eslint-disable no-script-url */
import { cn } from 'lib/util'
import { useChat } from 'providers/chat'
import React from 'react'
import styles from 'sass/components/navigation.module.scss'
import Menu from './menu'

export default function Navigation() {
  const { rooms } = useChat()

  const isUnread = rooms.some((room) => room.unreadCount > 0)

  return (
    <div className={styles.container}>
      {navLists.map((props) => (
        <Menu key={props.title} className={cn(styles.itemContainer, (props.title === '채팅' && isUnread) && styles.unread)} {...props} />
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
  href: 'none',
}, {
  title: '채팅',
  selectedPath: '/icons/selectedNav3.png',
  notSelectedPath: '/icons/nav3.png',
  href: '/chat',
}, {
  title: '스토어',
  selectedPath: '/icons/selectedNav4.png',
  notSelectedPath: '/icons/nav4.png',
  href: 'none',
}, {
  title: 'MY프로필',
  selectedPath: '/icons/selectedNav5.png',
  notSelectedPath: '/icons/nav5.png',
  href: '/profile',
}]
