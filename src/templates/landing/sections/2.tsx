import { useScroll } from 'providers/scrollProvider'
import ScrollTrigger from 'providers/scrollProvider/scrollTrigger'
import { useEffect, useRef } from 'react'
import styles from 'sass/templates/landing.module.scss'

export default function Section2() {
  let key = 0
  const { getScrollY } = useScroll()

  const carouselRef = useRef<HTMLDivElement>()

  const rotateCarousel = () => {
    requestAnimationFrame(rotateCarousel)
    carouselRef.current.style.transform = `translate3d(100px, 200px, 0) rotateX(40deg) rotateY(${(getScrollY() * 0.5) % 360}deg)`
  }

  useEffect(() => {
    requestAnimationFrame(rotateCarousel)
  }, [])

  return (
    <section className={styles.section2}>
      <video className={styles.video} autoPlay loop muted>
        <source src="/videos/space.mp4" type="video/mp4" />
        <track kind="captions" />
      </video>
      <div className={styles.stage}>
        <div className={styles.carousel} ref={carouselRef}>
          {[...Array(6)].map(() => {
            key += 1
            return (
              <div key={key} className={styles.panel}>
                <div className={styles.content} />
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.messageWrapper}>
        <ScrollTrigger
          transform={{
            from: 'transform: translateY(100%);',
            to: 'transform: traslateY(0%);',
          }}
          transition="transform 1s"
        >
          <p className={styles.message}>Resting my wings for a time</p>
        </ScrollTrigger>
      </div>
    </section>
  )
}
