import Avatar from 'widgets/avatar'
import styles from 'sass/components/review/preview.module.scss'

export default function Preview() {
  const tags = ['캐쥬얼', '유니크', '페미닌']
  return (
    <figure className={styles.container}>
      <img className={styles.image} src="/images/sample-avatar.jpg" alt="" />
      <div className={styles.header}>
        <div className={styles.avatarWrapper}>
          <Avatar src="/images/sample-avatar.jpg" size={36} />
        </div>
        <div className={styles.title}>
          <span className={styles.caption}>유지원 스타일리스트의 코디</span>
          <div className={styles.tagContainer}>
            {tags.map((value) => (
              <span key={value} className={styles.tag}>{`#${value}`}</span>
            ))}
          </div>
        </div>
      </div>
    </figure>
  )
}
