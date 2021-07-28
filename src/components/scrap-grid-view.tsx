import styles from 'sass/components/scrap-grid-view.module.scss'

export default function ScrapGridView() {
  const images = ['a', 'b', 'c', 'd', 'e']
  return (
    <section className={styles.container}>
      {images.map((value) => (
        <figure className={styles.figure}>
          <img key={value} className={styles.image} src={value} alt="" />
        </figure>
      ))}
    </section>
  )
}
