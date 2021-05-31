import styles from 'sass/components/stylistBox.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export default function StylistBox({
  info,
} : {
  info: StylistInfo,
}) {
  return (
    <Link href={{ pathname: '/stylist/profile', query: { stylist: JSON.stringify(info) } }}>
      <div className={styles.stylistBox}>
        <Image src={info.profileImg} width="100%" height="100%" className={styles.profileImg} />
        <div className={styles.infoBox}>
          <div>
            <span className={styles.name}>{info.name}</span>
            <span className={styles.stylistText}>스타일리스트</span>
          </div>
          <span className={styles.indicatorText}>
            {info.grade}
            점
            <span>|</span>
            {info.review}
            리뷰
            <span>|</span>
            {info.hired}
            고용
          </span>
          <div>
            {info.style.map((item) => <span className={styles.style} key={item}>{item}</span>)}
          </div>
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
