import styles from 'sass/components/profile-preview/tag-list.module.scss'

export default function TagList() {
  const data = ['캐쥬얼', '모던', '오피스룩']

  return (
    <section className={styles.container}>
      {data.map((value) => (
        <div className={styles.tag}>{value}</div>
      ))}
    </section>
  )
}
