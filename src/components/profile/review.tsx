import HorizontalList from 'components/horizontal-list'
import styles from 'sass/components/profile/review.module.scss'
import Link from 'next/link'
import Section from './section'

export default function Review() {
  const data = ['a', 'b', 'c', 'd']
  return (
    <Section head="내 리뷰">
      <HorizontalList
        className={styles.container}
        gap={12}
      >
        {data.map((value) => (
          <Link href={value}>
            <a
              className={styles.wrapper}
              href={value}
              draggable="false"
            >
              <img
                key={value}
                className={styles.figure}
                src={value}
                alt=""
                draggable="false"
              />
              <div className={styles.overlay}>
                미작성
              </div>
            </a>
          </Link>
        ))}
      </HorizontalList>
    </Section>
  )
}
