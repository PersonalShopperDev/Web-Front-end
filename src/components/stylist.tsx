import Link from 'next/link'
import styles from '../styles/listup.module.scss'
import Image from 'next/image';

const Stylist = ({ info }) => {
  return (
      <Link href={{pathname: "/stylist/profile", query: {stylist: JSON.stringify(info)}}} >
        <div className={styles.stylistBox}>
          <Image src={info.profileImg} width="93.11" height="92" className={styles.profile_img}/>
          <div>
            <span className={styles.name}>{info.name}</span><span>스타일리스트</span><br />
            <span className={styles.indicator}>{info.grade}점 | {info.review}리뷰 | {info.hired}고용</span><br/>
            {info.style.map(item => <span className={styles.style}>{item}</span>)}
          </div>
        </div>
      </Link>
  )
}

export default Stylist;