import styles from 'sass/components/stylistBox.module.scss'
import Link from 'next/link'

export default function StylistBox({
  info,
} : {
  info: Array,
}) {
  return (
    <Link href={{ pathname: '/stylist/profile', query: { stylist: JSON.stringify(info) } }}>
      <div className={styles.stylistBox}>
        <img src={info.img} alt={info.name} className={styles.profileImg} />
        <div className={styles.infoBox}>
          <div>
            <span className={styles.name}>{info.name}</span>
            <span className={styles.stylistText}>스타일리스트</span>
          </div>
          <span className={styles.priceText}>
            {info.price}
            원
          </span>
          <span className={styles.indicatorText}>
            {info.rating}
            점
            <span>|</span>
            {info.reviewCount}
            리뷰
            <span>|</span>
            {info.hireCount}
            고용
          </span>
          <div>
            {info.type.map((item) => <span className={styles.style} key={item}>{item}</span>)}
          </div>
        </div>
      </div>
    </Link>
  )
}
