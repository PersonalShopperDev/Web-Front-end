import HorizontalList from 'components/horizontal-list'
import styles from 'sass/components/profile/review.module.scss'
import Link from 'next/link'
import { ReviewListData, useAuth } from 'providers/auth'
import Section from './section'

interface ReviewData {
  reviewList: ReviewListData[]
}

export default function Review({ data }: { data: ReviewData }) {
  const { user } = useAuth()
  const { reviewList } = data || user
  return (
    <Section head="내 리뷰">
      <HorizontalList className={styles.container} gap={12}>
        {reviewList.map(({
          reviewId, img, supplierId, status,
        }) => {
          const isWritten = status === 1
          const href = isWritten ? `/profile/${supplierId}?section=review&reviewId=${reviewId}` : `/review/new/${reviewId}`

          return (
            <Link key={reviewId} href={href}>
              <a className={styles.wrapper} href={href} draggable="false">
                <img
                  className={styles.figure}
                  src={img}
                  alt=""
                  draggable="false"
                />
                {!isWritten && (
                  <div className={styles.overlay}>
                    미작성
                  </div>
                )}
              </a>
            </Link>
          )
        })}
      </HorizontalList>
    </Section>
  )
}
