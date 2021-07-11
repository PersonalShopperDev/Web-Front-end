import styles from 'sass/components/profile-preview/name.module.scss'

export default function PreviewName({ name } : { name : string}) {
  return (
    <section className={styles.container}>
      <h2 className={styles.name}>{name}</h2>
    </section>
  )
}
