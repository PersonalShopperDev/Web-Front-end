import SectionHeader from 'src/widget/section-header'
import styles from 'sass/components/stylist-grid-view.module.scss'

export default function StylistGridView() {
  const data = [...Array(6)]
  return (
    <section className={styles.container}>
      <SectionHeader
        title="스타일리스트"
        moreHref="/"
      />
      <section className={styles.grid}>
        {data.map(() => (
          <figure className={styles.figure}>
            <div className={styles.imageWrapper} style={{ backgroundColor: `#${Math.random().toString(16).slice(-6)}` }}>
              <img src="/" alt="stylist" />
            </div>
            <figcaption className={styles.figcaption}>
              <h4 className={styles.stylist}>유지원 스타일리스트</h4>
              <span className={styles.info}>{`고용 ${12}회 | 리뷰 ${10}`}</span>
            </figcaption>
          </figure>
        ))}
      </section>
    </section>
  )
}
