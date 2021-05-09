import styles from 'sass/templates/landing.module.scss'

export default function Section0() {
  return (
    <section className={styles.section0}>
      <video className={styles.video} autoPlay loop muted>
        <source src="/videos/film.mp4" type="video/mp4" />
        <track kind="captions" />
      </video>
      <div className={styles.content}>
        <p className={styles.title}>{'Vivre, ce\'st pas survire'}</p>
        <p className={styles.description}>{'Per me si va ne la citta dolente, per me si va ne l\'etterno dolore, per me si va tra la perduta gente. Giustizia mosse il mio alto fattore; fecemi la divina podestate, la somma sapienza e \'l primo amore. Dinanzi a me non fuor cose create se non etterne, e io etterno duro. Lasciate ogni speranza, voi ch\'intrate.'}</p>
        <button className={styles.learnMore} type="button">Learn more</button>
      </div>
    </section>
  )
}
