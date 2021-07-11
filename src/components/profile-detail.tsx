import styles from 'sass/components/profile-detail.module.scss'
import Icon from 'widgets/icon'

interface Data {
  userType: string,
  name: string,
  introduction: string,
  styles: Array<string>,
  profileImg: string,
  hopeToSupplier?: string,
  bodyStat?: {
    isPublic: boolean,
    height: number,
    weight: number,
    id: number,
    value: string,
  },
  closet?: {
    id: number,
    img: string
  },
  rating: number,
  hireCount: number,
  reviewCount: number,
  careerList: [{
    value: string,
    type: number
  }],
  price: number,
  coord: [{
    id: number,
    img: string,
  }]
}

export default function ProfileDetail({
  info,
} : {
  info : Data,
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
            <img src={item.img} width="164" height="171" className={styles.clothImage} alt="대표 코디" key={item.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
