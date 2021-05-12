import Link from 'next/link'
import Image from 'next/image'
import styles from '../../sass/listup.module.scss'

export default function Stylist({ info } : { info : StylistInfo }) {
  return (
    <Link href={{ pathname: '/stylist/profile', query: { stylist: JSON.stringify(info) } }}>
      <div className={styles.stylistBox}>
        <Image src={info.profileImg} width="93.11" height="92" className={styles.profile_img} />
        <div>
          <div>
            <span className={styles.name}>{info.name}</span>
            <span>스타일리스트</span>
          </div>
          <span className={styles.indicator}>
            {info.grade}
            점 |
            {info.review}
            리뷰 |
            {info.hired}
            고용
          </span>
          <div>{info.style.map((item) => <span className={styles.style}>{item}</span>)}</div>
        </div>
      </div>
    </Link>
  )
}

export interface StylistInfo {
  profileImg: string,
  name: string,
  grade: number,
  review: number,
  hired: number,
  style: string[]
  introduction: string,
  photoList: string[],
}
