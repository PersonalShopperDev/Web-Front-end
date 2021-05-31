import { cn } from 'lib/util'
import Carousel from 'components/carousel'
import styles from 'sass/components/before-after.module.scss'
import SectionHeader from 'src/widget/section-header'

export default function BeforeAfter() {
  const articles = [...Array(10)].map((_, index) => index)
  const description = '리뷰 사진 클릭 시 스타일리스트 프로필로 이동합니다'

  return (
    <section className={styles.container}>
      <section className={styles.header}>
        <SectionHeader title="Before&After" moreHref="/" />
        <span className={styles.description}>{description}</span>
      </section>
      <Carousel className={styles.articleContainer}>
        {articles.map((value, index) => (
          <section key={value} className={styles.article}>
            <section key={value} className={styles.photozone}>
              <figure className={cn(styles.figure, styles.before)}>
                <figcaption className={styles.figcaption}>Before</figcaption>
                <img src="" alt="Before" />
              </figure>
              <figure className={cn(styles.figure, styles.after)}>
                <figcaption className={styles.figcaption}>After</figcaption>
                <img src="" alt="After" />
              </figure>
            </section>
            <h3 className={styles.caption}>{`일상복밖에 못 입었던 내가 힙한 스타일로~${index}`}</h3>
          </section>
        ))}
      </Carousel>
    </section>
  )
}
