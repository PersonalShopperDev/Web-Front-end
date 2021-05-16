import ScrollTrigger from 'providers/scrollProvider/scrollTrigger'
import { useEffect, useState } from 'react'
import styles from 'sass/templates/landing.module.scss'
import ConstraintImage from 'widget/constraintImage'

export default function Section3() {
  let key = 0
  let interval : any
  const [active, setActive] = useState(false)
  const [transition, triggerTransition] = useState(0)
  const [skip, setSkip] = useState(0)
  const [from, setFrom] = useState(0)
  const transit = () => {
    triggerTransition(1)
    const offTransition = () => {
      if (document.documentElement.scrollWidth > 1096) {
        setFrom((prev) => prev + 3)
      } else if (document.documentElement.scrollWidth > 768) {
        setFrom((prev) => prev + 2)
      } else {
        setFrom((prev) => prev + 1)
      }
      triggerTransition(0)
    }
    setTimeout(offTransition, 500)
  }
  const selectImageNum = () => {
    if (document.documentElement.scrollWidth > 1096) {
      setSkip(3)
    } else if (document.documentElement.scrollWidth > 768) {
      setSkip(2)
    } else {
      setSkip(1)
    }
  }
  const handleResize = () => {
    clearInterval(interval)
    selectImageNum()
    interval = setInterval(transit, 5000)
  }
  useEffect(() => {
    selectImageNum()
    interval = setInterval(transit, 5000)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
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
        {[...Array(skip)].map(() => {
          key += 1
          return (
            <Figure
              key={key}
              src={`/images/snaps/${(from + key - 1) % 13}.jpg`}
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
