import ScrollTrigger from 'providers/scrollProvider/scrollTrigger'
import ConstraintImage from 'widget/constraintImage'
import styles from 'sass/templates/landing.module.scss'

export default function Section1() {
  return (
    <section className={styles.section1}>
      <ScrollTrigger
        transform={{
          from: 'transform: translateX(-400%);',
          to: 'transform: translateX(-60%);',
          outro: 'transform: translateX(500%);',
        }}
        defaultStyle="top: 10%;"
        className={styles.squareWrapper}
      >
        <div className={styles.squareLeft} />
      </ScrollTrigger>
      <ScrollTrigger
        transform={{
          from: 'transform: translateX(200%);',
          to: 'transform: translateX(25%);',
          outro: 'transform: translateX(-300%);',
        }}
        defaultStyle="bottom: 10%;"
        className={styles.squareWrapper}
      >
        <div className={styles.squareRight} />
      </ScrollTrigger>
      <ScrollTrigger
        transform={{
          from: 'opacity: 0',
          to: 'opacity: 1',
        }}
      >
        <ConstraintImage src="/images/self.jpg" width={300} />
      </ScrollTrigger>
      <div className={styles.nameWrapper}>
        <ScrollTrigger
          transform={{
            from: 'transform: translateY(100%);',
            to: 'transform: translateY(0%);',
          }}
        >
          <p className={styles.name}>Mason Mount</p>
        </ScrollTrigger>
      </div>
      <ScrollTrigger
        transform={{
          from: 'opacity: 0;',
          to: 'opacity: 1;',
        }}
        transition="opacity 5s;"
      >
        <p className={styles.description}>{description}</p>
      </ScrollTrigger>
    </section>
  )
}

const description = '(born 10 January 1999) is an English professional footballer who plays as an attacking or central midfielder for Premier League club Chelsea and the England national team. Mount joined Chelsea at the age of six, and began his senior career on loan to Vitesse in the Dutch Eredivisie and Derby County in the Championship before making his Chelsea debut in 2019.'
