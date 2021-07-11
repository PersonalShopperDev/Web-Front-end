import styles from 'sass/components/profile-preview/tag-list.module.scss'

export default function TagList({ data } : { data: string[]}) {
  if (!data) {
    return <></>
  }

  if (data.length < 1) {
    return <></>
  }

  return (
    <section className={styles.container}>
      {data.map((value) => (
        <div className={styles.tag}>{value}</div>
      ))}
    </section>
  )
}
