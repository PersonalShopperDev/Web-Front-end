import Section from 'components/profile/section'
import styles from 'sass/components/profile-preview/style-info.module.scss'

interface Data {
  height: number,
  weight: number,
  body: number,
}

export default function StyleInfo({ data } : { data : Data }) {
  const { height, weight, body } = data
  return (
    <Section
      head="스타일 정보"
    >
      <div className={styles.container}>
        {height && (
          <div className={styles.row}>
            <span className={styles.property}>키</span>
            <span className={styles.value}>{`${height}cm`}</span>
          </div>
        )}
        {weight && (
          <div className={styles.row}>
            <span className={styles.property}>몸무게</span>
            <span className={styles.value}>{`${weight}kg`}</span>
          </div>
        )}
        {body && (
          <div className={styles.row}>
            <span className={styles.property}>체형</span>
            <span className={styles.value}>{`${body}`}</span>
          </div>
        )}
      </div>
    </Section>
  )
}
