import Link from 'next/link'
import styles from '../../sass/listup.module.scss'
import Image from 'next/image';

export default function Stylist ({ info } : { info : StyleListInfo }) {
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

export interface StyleListInfo {
  profileImg: string, 
  name: string,
  grade: number,
  review: number,
  hired: number,
  style: string[]
  introduction: string,
  photoList: string[],
}; 