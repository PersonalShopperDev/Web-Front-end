import { cn } from 'lib/util'
import Carousel from 'components/carousel'
import styles from 'sass/components/before-after.module.scss'
import SectionHeader from 'widgets/section-header'

export interface BeforeAfterData {
  supplierId: number,
  demanderId: number,
  img: string,
  content: string,
  styleList: {
    id: number,
    value: string,
  }[]
  body : {
    id: number,
    value: string,
  }
}

export default function BeforeAfter({ data } : {data: BeforeAfterData[]}) {
  if (!data || data?.length === 0) {
    return <></>
  }

  return (
    <section className={styles.container}>
      <section className={styles.header}>
        <SectionHeader title="Styling Reivew" />
        <p className={styles.notice}>이미지를 누르면 코디받은 유저의 후기를 자세히 볼 수 있습니다.</p>
      </section>
      <Carousel className={styles.articleContainer}>
        {data.map(({
          body,
          styleList,
          content,
          img,
        }) => (
          <section className={styles.childContainer} key={img}>
            <figure className={cn(styles.figure)}>
              <img src={img} alt="Before" />
            </figure>
            <div className={styles.detail}>
              <div className={styles.row}>
                <span className={styles.label}>
                  체형
                </span>
                <span className={styles.value}>
                  {body.value}
                </span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>
                  선호스타일
                </span>
                {styleList.map((style) => <span key={style.id} className={styles.value}>{`#${style.value}`}</span>)}
              </div>
              <p className={styles.content}>
                {content}
              </p>
            </div>
          </section>
        ))}
      </Carousel>
    </section>
  )
}
