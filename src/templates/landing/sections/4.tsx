import {
  RefObject, useEffect, useRef, useState,
} from 'react'
import styles from 'sass/templates/landing.module.scss'

export default function Section4() {
  const count = 5
  let key = 0
  const [selected, setSelected] = useState(Math.floor(count * 0.5))

  const panelRefs: RefObject<HTMLDivElement>[] = []

  useEffect(() => {
    const middle = selected
    panelRefs.forEach((panel, index) => {
      // eslint-disable-next-line no-param-reassign
      panel.current.style.transform = `
        rotateX(5deg) 
        rotateY(${(index - middle) * (120 / count)}deg) 
        rotateZ(${(index - middle) * 7}deg) 
        translateY(${Math.abs(index - middle) * 30}px)
        translateZ(1200px) 
        `
    })
  }, [selected])

  return (
    <section className={styles.section4}>
      <div className={styles.container}>
        {[...Array(count)].map((_, index) => {
          key += 1
          const ref = useRef<HTMLDivElement>()
          panelRefs.push(ref)
          return (
            <div key={key} ref={ref} className={styles.panel}>
              <button
                className={styles.contentWrapper}
                onClick={() => setSelected(index)}
                type="button"
              >
                <div className={styles.content}>
                  <p className={styles.title}>Socialist realism</p>
                  <p className={styles.key}>{key}</p>
                  <p className={styles.description}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Architecto eligendi illum illo obcaecati excepturi ipsam.
                    Voluptatem odio illo sed magni quaerat ipsum, dolorum,
                    itaque, tempora voluptate doloremque repudiandae eius quam?
                  </p>
                </div>
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
