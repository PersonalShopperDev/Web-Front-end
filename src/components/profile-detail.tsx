import styles from 'sass/components/profile-detail.module.scss'
import Icon from 'widgets/icon'

export default function ProfileDetail({
  info,
} : {
  info : any,
}) {
  return (
    <div className={styles.profileDetailBox}>
      <div className={styles.infoContainer}>
        <div>
          <span className={styles.name}>{info.name}</span>
          <span className={styles.stylistText}>Stylist</span>
        </div>
        <div>
          {info.careerList.map((item) => (
            <div key={item.type}>
              <div className={styles.flexContainer}>
                <Icon src="profileIcon1.png" size={12} />
                <span className={styles.careerText}>
                  {item.value}
                  에서 근무중
                </span>
              </div>
              <div className={styles.flexContainer}>
                <Icon src="profileIcon2.png" size={12} />
                <span className={styles.careerText}>
                  경력
                  {' '}
                  {item.type}
                  년차 스타일리스트
                </span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <span className={styles.indicatorText}>
            {info.rating}
            점
          </span>
          <span className={styles.indicatorLine}>|</span>
          <span className={styles.indicatorText}>
            {info.reviewCount}
            리뷰
          </span>
          <span className={styles.indicatorLine}>|</span>
          <span className={styles.indicatorText}>
            {info.hireCount}
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
        <div className={styles.coordContainer}>
          {info.coord.map((item) => (
            <img src={item.img} width="164" height="171" className={styles.clothImage} alt="대표 코디" />
          ))}
        </div>
      </div>
    </div>
  )
}
