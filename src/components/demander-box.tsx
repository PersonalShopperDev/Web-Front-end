import React from 'react'
import styles from 'sass/components/demander-box.module.scss'
import Link from 'next/link'

interface StyleType {
    id: number
    value: string
}

interface Info {
    id: number,
    img: string,
    name: string,
    styleType: StyleType[]
}
export default function DemanderBox({
  info,
} : {
  info: Info,
}) {
  return (
    <Link href={`/profile/${info.id}`}>
      <div className={styles.listBox}>
        <img src={info.img} alt={info.name} className={styles.profileImg} />
        <div className={styles.infoBox}>
          <span className={styles.name}>{info.name}</span>
          {info.styleType.length !== 0
          && (
          <div className={styles.flexContainer}>
            <span>선호스타일:</span>
            {info.styleType.map(({ id, value }) => (
              <span className={styles.styleBox} key={id}>{value}</span>
            ))}
          </div>
          )}
        </div>
      </div>
    </Link>
  )
}
