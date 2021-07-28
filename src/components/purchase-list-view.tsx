import Link from 'next/link'
import styles from 'sass/components/purchase-list-view.module.scss'
import { History } from 'providers/history'
import { getCookie } from 'lib/util/cookie'
import { ACCESS_TOKEN } from 'providers/auth'
import parseJwt from 'lib/util/jwt'
import { useAlert } from 'providers/dialog/alert/inner'

export default function PurchaseListView({
  data,
}: {
  data: History
}) {
  const {
    estimateId, paymentTime, price, targetUser, status,
  } = data
  const { createAlert } = useAlert()
  const token = getCookie(ACCESS_TOKEN)
  const { userType } = parseJwt(token)
  const onClickButton = async () => {
    await createAlert({ text: '코디 진행중입니다' })
  }
  return (
    <section className={styles.container}>
      <figure key={estimateId} className={styles.card}>
        <div className={styles.header}>
          <span className={styles.label}>결제일 </span>
          <span>{paymentTime.toString().substr(0, 10)}</span>
        </div>
        <div className={styles.body}>
          <div className={styles.imageWrapper}>
            <img className={styles.image} src={targetUser.img} alt="" />
          </div>
          <div className={styles.detail}>
            <div className={styles.identity}>
              <span>{targetUser.name}</span>
              <span className={styles.label}>{userType === 'D' ? '스타일리스트' : '일반인'}</span>
            </div>
            <div className={styles.price}>
              {price}
              원
            </div>
          </div>
          {userType === 'D'
            ? (
              <>
                {status === 5 || status === 6
                  ? (
                    <div className={styles.reviewComplete}>코디 완료</div>
                  )
                  : <div className={styles.write}>작성중 코디</div>}
              </>
            )
            : (
              <>
                {status === 6
                  ? <div className={styles.reviewComplete}>리뷰 완료</div>
                  : (
                    <>
                      {status === 5
                        ? (
                          <Link href="/review/new">
                            <a href="/review/new" className={styles.write}>
                              리뷰 쓰기
                            </a>
                          </Link>
                        )
                        : <button type="button" className={styles.write} onClick={onClickButton}>리뷰 쓰기</button> }
                    </>
                  )}
              </>
            ) }
        </div>
      </figure>
    </section>
  )
}
