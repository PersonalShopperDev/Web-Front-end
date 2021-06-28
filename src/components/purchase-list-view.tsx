import Link from 'next/link'
import styles from 'sass/components/purchase-list-view.module.scss'

export default function PurchaseListView() {
  const data = [
    {
      date: '2021.05.31',
      name: '유지원',
      price: 21000,
      image: 'a',
    },
    {
      date: '2021.06.31',
      name: '유지원',
      price: 21000,
      image: 'a',
    },
  ]
  return (
    <section className={styles.container}>
      {data.map(({
        date, name, price, image,
      }) => (
        <figure key={date} className={styles.card}>
          <div className={styles.header}>
            <span className={styles.label}>결제일 </span>
            <span>{date}</span>
          </div>
          <div className={styles.body}>
            <div className={styles.imageWrapper}>
              <img className={styles.image} src={image} alt="" />
            </div>
            <div className={styles.detail}>
              <div className={styles.identity}>
                <span>{name}</span>
                <span className={styles.label}>스타일리스트</span>
              </div>
              <div className={styles.type}>
                일반 채팅 및 코디 결제
              </div>
              <div className={styles.price}>
                {price}
              </div>
            </div>
            <Link href="/review/new">
              <a href="/review/new" className={styles.write}>
                리뷰 쓰기
              </a>
            </Link>
          </div>
        </figure>
      ))}
    </section>
  )
}
