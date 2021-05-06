import styles from '../../sass/listup.module.scss'
import Image from 'next/image';

export default function Header({isRanking, setIsRanking}) {
    return (
        <div className={styles.header}>
            <div>
                <button className={!isRanking ? styles.selected : styles.notSelected} onClick={() => setIsRanking(false)}>모아보기</button>
                <button className={isRanking ? styles.selected : styles.notSelected} onClick={() => setIsRanking(true)}>순위보기</button>
            </div>
            <Image src='/images/icons/search.png' width="16.11" height="17"/>
        </div>
    )
}
