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