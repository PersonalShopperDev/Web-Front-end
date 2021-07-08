import SectionHeader from 'widgets/section-header'
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
      <section className={styles.grid} />
    </section>
  )
}
