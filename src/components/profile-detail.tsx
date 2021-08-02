import { User } from 'providers/auth'
import styles from 'sass/components/profile-detail.module.scss'
import Icon from 'widgets/icon'

export default function ProfileDetail({
  data,
} : {
  data : User,
}) {
  const {
    name, careerList, rating, reviewCount, hireCount, introduction, coord,
  } = data
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div>
          <span className={styles.name}>{name}</span>
          <span className={styles.stylistText}>Stylist</span>
        </div>
        <div>
          {careerList !== undefined && careerList.map((item) => (
            <div key={item.type}>
              {item.type === 0
              && (
              <div className={styles.flexContainer}>
                <Icon src="profileIcon1.png" size={12} />
                <span className={styles.careerText}>
                  {item.value}
                  에서 근무중
                </span>
              </div>
              ) }
              {item.type === 1
              && (
              <div className={styles.flexContainer}>
                <Icon src="profileIcon2.png" size={12} />
                <span className={styles.careerText}>
                  경력
                  {' '}
                  {item.value}
                  년차 스타일리스트
                </span>
              </div>
              ) }
            </div>
          ))}
        </div>
        <div className={styles.indicatorContainer}>
          <span className={styles.indicatorText}>
            {rating}
            점
          </span>
          <span className={styles.indicatorLine}>|</span>
          <span className={styles.indicatorText}>
            {reviewCount}
            리뷰
          </span>
          <span className={styles.indicatorLine}>|</span>
          <span className={styles.indicatorText}>
            {hireCount}
            회고용
          </span>
        </div>
      </div>
      <div className={styles.introductionContainer}>
        <div className={styles.titleText}>자기소개</div>
        <span className={styles.contentText}>{introduction}</span>
      </div>
      <div className={styles.codyContainer}>
        <div className={styles.titleText}>대표 코디</div>
        <div className={styles.coordContainer}>
          {coord.map(({ img, id }) => (
            <div className={styles.clothImage}>
              <img src={img} width="164" height="171" alt="대표 코디" key={id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
