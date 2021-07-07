import styles from 'sass/components/review.module.scss'
import Image from 'next/image'

export default function Review({
  info,
}: {
  info: any,
}) {
  console.log(info)
  const reviewUserLists: ReviewInfo[] = [reviewUser, reviewUser]
  return (
    <div className={styles.reviewContainer}>
      <div className={styles.reviewBox}>
        <div className={styles.leftItem}>
          <div className={styles.keyText}>평점</div>
          <span className={styles.valueText}>{info.grade}</span>
        </div>
        <div className={styles.rightItem}>
          <div className={styles.keyText}>리뷰</div>
          <span className={styles.valueText}>{info.review}</span>
        </div>
      </div>
      {reviewUserLists.map((item) => (

        <div className={styles.userBox}>
          <div className={styles.userNameBox}>
            <div>
              <Image src={reviewUser.profileImg} width="25" height="25" />
              <span className={styles.nameText}>
                {item.name}
                님
              </span>
            </div>
            <span className={styles.dateText}>{item.date}</span>
          </div>
          <div className={styles.starBox}>
            <span>평점:</span>
            {[...Array(4)].map(() => (
              <div>
                <Image src="/icons/filledStar.png" width="15" height="15" />
              </div>
            ))}
            <div>
              <Image src="/icons/Star.png" width="15" height="15" />
            </div>
            <span>
              {item.grade.toFixed(1)}
              점
            </span>
          </div>
          <Image src={reviewUser.style} width="124" height="130" />
          <div className={styles.infoBox}>
            <div>
              <span>키</span>
              {item.height}
              cm
            </div>
            <div>
              <span>몸무게</span>
              {item.weight}
              kg
            </div>
            <div>
              <span>체형</span>
              {item.form}
            </div>
            <div>
              <span>선호스타일</span>
              {item.preferredStyle.map((style) => (
                <div className={styles.styleHashtag}>{ style }</div>
              ))}
            </div>
          </div>
          <div className={styles.contentBox}>
            <span>{item.review}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

const reviewUser: ReviewInfo = {
  profileImg: '/icons/sample-icon.png',
  name: '김세현',
  grade: 4.0,
  style: '/images/sample-cody.png',
  review: '선생님 덕분에 패션고자에서 벗어났습니다~! 옷이 이쁘면 나한테 어울리는거 상관없이 입었는데 이제는 나에게 잘 어울리는 옷이 뭔지 알게 되었습니다!',
  date: '2021.05.30',
  height: 162,
  weight: 50,
  form: '슬림체형',
  preferredStyle: ['#페미닌', '#심플베이직', '#우아함'],
}

export interface ReviewInfo {
    profileImg: string,
    name: string,
    grade: number,
    style: string,
    review: string,
    date: string,
    height: number,
    weight: number,
    form: string,
    preferredStyle: string[],
}
