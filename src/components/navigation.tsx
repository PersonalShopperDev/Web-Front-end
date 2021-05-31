import styles from 'sass/components/navigation.module.scss'
import Image from 'next/image'

export default function Navigation() {
  return (
    <nav className={styles.navContainer}>
      { nav.map((item, index) => (
        <button className={styles.option} type="button" key={item.path}>
          <Image src={item.path} width={item.width} height={item.height} />
          <span className={styles.optionText}>{item.name}</span>
        </button>
      ))}
    </nav>
  )
}
interface navInfo {
    name: string,
    width: number,
    height: number,
    path: string,
}

const nav: navInfo[] = [{
  name: '스타일매칭',
  width: 23,
  height: 21.5,
  path: '/icons/nav1.png',
}, {
  name: '패션매거진',
  width: 23,
  height: 23.15,
  path: '/icons/nav2.png',
}, {
  name: '채팅',
  width: 18,
  height: 18,
  path: '/icons/nav3.png',
}, {
  name: '스토어',
  width: 20,
  height: 17,
  path: '/icons/nav4.png',
}, {
  name: 'MY 프로필',
  width: 17.89,
  height: 18,
  path: '/icons/nav5.png',
}]
