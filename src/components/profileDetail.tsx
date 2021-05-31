import styles from 'sass/components/profileDetail.module.scss'
import { StylistInfo } from 'src/components/stylistBox'
import Image from 'next/image'

export default function ProfileDetail({
  info,
} : {
  info : StylistInfo,
}) {
  const company: string = '1초 코디에서 근무 중'
  const career: string = '신입 스타일리스트'
  const codyPath: string = '/images/sample-cody.png'
  return (
    <div className={styles.profileDetailBox}>
      <div className={styles.infoContainer}>
        <div>
          <span className={styles.name}>{info.name}</span>
          <span className={styles.stylistText}>Stylist</span>
        </div>
        <div>
          <div className={styles.careerText}>{company}</div>
          <div className={styles.careerText}>{career}</div>
        </div>
        <div>
          <span className={styles.indicatorText}>
            {info.grade}
            점
          </span>
          <span className={styles.indicatorLine}>|</span>
          <span className={styles.indicatorText}>
            {info.review}
            리뷰
          </span>
          <span className={styles.indicatorLine}>|</span>
          <span className={styles.indicatorText}>
            {info.hired}
            회고용
          </span>
        </div>
      </div>
      <div className={styles.introductionContainer}>
        <div className={styles.titleText}>자기소개</div>
        <span className={styles.contentText}>{info.introduction}</span>
      </div>
      <div className={styles.codyContainer}>
        <div className={styles.titleText}>대표 코디</div>
        {[...Array(4)].map(() => (
          <Image src={codyPath} width="164" height="171" className={styles.clothImage} />
        ))}
      </div>
    </div>
  )
}
