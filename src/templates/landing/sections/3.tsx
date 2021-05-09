import ScrollTrigger from 'providers/scrollProvider/scrollTrigger'
import { useEffect, useState } from 'react'
import styles from 'sass/templates/landing.module.scss'
import ConstraintImage from 'widget/constraintImage'

let from = 0

export default function Section3() {
  let key = 0
  let interval : any

  const [active, setActive] = useState(false)
  const [transition, triggerTransition] = useState(0)

  const transit = () => {
    triggerTransition(1)
    const offTransition = () => {
      from += 3
      triggerTransition(0)
    }
    setTimeout(offTransition, 500)
  }

  useEffect(() => {
    interval = setInterval(transit, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className={styles.section3}>
      <div className={styles.labelWrapper}>
        <ScrollTrigger
          transform={{
            from: 'transform: translateY(100%);',
            to: 'transform: translateY(0%);',
          }}
        >
          <p className={styles.label}>We go Norwich</p>
        </ScrollTrigger>
      </div>
      <ScrollTrigger
        className={styles.row}
        inCallback={() => {
          setActive(true)
        }}
        outCallback={() => {
          setActive(false)
        }}
      >
        {[...Array(6)].map(() => {
          key += 1
          return (
            <Figure
              key={key}
              src={`/images/snaps/${(from + key - 1) % 12}.jpg`}
              active={active}
              transition={transition}
            />
          )
        })}
      </ScrollTrigger>
    </section>
  )
}

function Figure({
  src,
  active,
  transition,
}: {
  src: string
  active: boolean
  transition: number
}) {
  const getTransition = () : string => {
    switch (transition) {
      case 1:
        return styles.transition
      default:
        return null
    }
  }
  return (
    <figure className={styles.figure}>
      <ConstraintImage className={styles.image} src={src} height={700} />
      <div
        className={`${styles.curtain} ${active === true && styles.active} ${getTransition()}`}
      />
    </figure>
  )
}
