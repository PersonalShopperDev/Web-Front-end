import React, { useState } from 'react'
import styles from 'sass/components/navigation.module.scss'
import { useRouter } from 'next/dist/client/router'

export default function Navigation() {
  const router = useRouter()
  const [nav, setNav] = useState(0)
  const onButtonClick = (index) => {
    if (nav === index) return
    setNav(index)
    if (index === 0) {
      router.push('/stylist')
    } else if (index === 1) {
      console.log('go to fashion contents')
    } else if (index === 2) {
      console.log('go to fashion chat')
    } else if (index === 3) {
      console.log('go to fashion store')
    } else {
      console.log('go to fashion my profile')
    }
  }
  return (
    <div className={styles.container}>
      {navLists.map((value, index) => (
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
      ))}
    </div>
  )
}

const navLists = [{
  title: '스타일매칭',
  selectedPath: '/icons/selectedNav1.png',
  notSelectedPath: '/icons/nav1.png',
}, {
  title: '패션컨텐츠',
  selectedPath: '/icons/selectedNav2.png',
  notSelectedPath: '/icons/nav2.png',
}, {
  title: '채팅',
  selectedPath: '/icons/selectedNav3.png',
  notSelectedPath: '/icons/nav3.png',
}, {
  title: '스토어',
  selectedPath: '/icons/selectedNav4.png',
  notSelectedPath: '/icons/nav4.png',
}, {
  title: 'MY프로필',
  selectedPath: '/icons/selectedNav5.png',
  notSelectedPath: '/icons/nav5.png',
}]
