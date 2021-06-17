import SectionHeader from 'src/widget/section-header'
import styles from 'sass/components/stylist-grid-view.module.scss'

export interface StylistGridViewData {
  img: string,
  name: string,
  hire: number,
  review: number,
}

export default function StylistGridView({ data } : { data: StylistGridViewData[] }) {
  return (
    <section className={styles.container}>
      <SectionHeader
        title="스타일리스트"
        moreHref="/"
      />
      <section className={styles.grid}>
        {data.map(({
          img,
          name,
          hire = 0,
          review = 0,
        }) => (
          <figure key={Math.random()} className={styles.figure}>
            <div className={styles.imageWrapper}>
              <img src={img} alt="stylist" />
            </div>
            <figcaption className={styles.figcaption}>
              <h4 className={styles.stylist}>{`${name} 스타일리스트`}</h4>
              <span className={styles.info}>{`고용 ${hire}회 | 리뷰 ${review}`}</span>
            </figcaption>
          </figure>
        ))}
      </section>
    </section>
  )
}
