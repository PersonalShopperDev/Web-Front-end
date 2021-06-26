import Section from 'components/profile/section'
import styles from 'sass/components/profile-preview/style-info.module.scss'

interface Data {
  height: number,
  weight: number,
  shape: string,
}

export default function StyleInfo({ data } : { data : Data }) {
  const { height, weight, shape } = data
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
        {shape && (
          <div className={styles.row}>
            <span className={styles.property}>체형</span>
            <span className={styles.value}>{`${shape}`}</span>
          </div>
        )}
      </div>
    </Section>
  )
}
