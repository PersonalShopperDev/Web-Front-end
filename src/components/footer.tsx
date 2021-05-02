import styles from '../styles/listup.module.scss'
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div>
                <Image src='/images/icons/home.png' width="24" height="20"/><br/>홈
            </div>
            <div className={styles.stylist}>
                <Image src='/images/icons/stylist.png' width="18" height="21"/><br/>스타일리스트
            </div>
            <div>
                <Image src='/images/icons/chat.png' width="26" height="22"/><br/>채팅
            </div>
            <div>
                <Image src='/images/icons/like.png' width="23" height="21"/><br/>좋아요
            </div>
            <div>
                <Image src='/images/icons/mypage.png' width="20" height="20"/><br/>마이페이지
            </div>
        </footer>
    )
}

export default Footer;