import styles from 'sass/components/chat/date-divider.module.scss'

export default function DateDivider({ timestamp }: { timestamp: string }) {
  const time = new Date(timestamp)

  const year = time.getFullYear()

  const month = (time.getMonth() + 1).toString().padStart(2, '0')

  const date = time.getDate().toString().padStart(2, '0')

  return (
    <div className={styles.container}>
      <hr className={styles.line} />
      <span className={styles.timestamp}>{`${year}.${month}.${date}`}</span>
      <hr className={styles.line} />
    </div>
  )
}
