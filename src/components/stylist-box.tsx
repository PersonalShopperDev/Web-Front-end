import React from 'react'
import styles from 'sass/components/stylist-box.module.scss'
import Link from 'next/link'

interface StyleType {
  id: number
  value: string
}
interface Info {
  id: number
  img: string
  name: string
  price: number
  rating: number
  hireCount: number
  reviewCount: number
  styleType: StyleType[]
}
export default function StylistBox({
  info,
} : {
  info: Info,
}) {
  return (
    <Link href={{ pathname: '/users/profile', query: { id: info.id } }}>
      <div className={styles.listBox}>
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
            {info.styleType.map((item) => (
              <span className={styles.style} key={item.id}>
                {item.value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
