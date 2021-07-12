import { cn } from 'lib/util'
import Carousel from 'components/carousel'
import styles from 'sass/components/before-after.module.scss'
import SectionHeader from 'widgets/section-header'

export interface BeforeAfterData {
  stylistId: string,
  beforeImg: string,
  afterImg: string,
  title: string,
  name: string,
}

export default function BeforeAfter({ data } : {data: BeforeAfterData[]}) {
  const description = '리뷰 사진 클릭 시 스타일리스트 프로필로 이동합니다'

  if (!data || data?.length === 0) {
    return <></>
  }

  return (
    <section className={styles.container}>
      <section className={styles.header}>
        <SectionHeader title="Before&After" moreHref="/" />
        <span className={styles.description}>{description}</span>
      </section>
      <Carousel className={styles.articleContainer}>
        {data.map(({
          stylistId,
          beforeImg,
          afterImg,
          title,
        }) => (
          <section key={`${stylistId}${title}`}>
            <div className={styles.photozone}>
              <figure className={cn(styles.figure, styles.before)}>
                <figcaption className={styles.figcaption}>Before</figcaption>
                <img src={beforeImg} alt="Before" />
              </figure>
              <figure className={cn(styles.figure, styles.after)}>
                <figcaption className={styles.figcaption}>After</figcaption>
                <img src={afterImg} alt="After" />
              </figure>
            </div>
            <h3 className={styles.caption}>{title}</h3>
          </section>
        ))}
      </Carousel>
    </section>
  )
}
