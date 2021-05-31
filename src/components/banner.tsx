import { cn } from 'lib/util'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import styles from 'sass/components/banner.module.scss'

export default function Banner() {
  const temporaryImages = ['red', 'green', 'blue']

  const [figureArray, setFigureArray] = useState(temporaryImages)

  const carouselRef = useRef<HTMLElement>()

  const data = {
    animation: null,
    interval: 3000,
    timeout: null,
    current: 0,
    transition: 700,
  }

  const animate = () => {
    data.animation = requestAnimationFrame(animate)
    carouselRef.current.style.transform = `translateX(-${data.current * 100}%)`
  }

  const tranistion = () => {
    carouselRef.current.style.transition = `transform ${data.transition}ms`
    data.current += 1
    setTimeout(arrange, data.transition)
  }

  const arrange = () => {
    carouselRef.current.style.transition = ''
    setFigureArray((array) => {
      const [prev, ...rest] = array
      return [...rest, prev]
    })
    data.current = 0
  }

  useEffect(() => {
    data.timeout = setInterval(tranistion, data.interval)
    data.animation = requestAnimationFrame(animate)
    return () => {
      clearInterval(data.timeout)
      cancelAnimationFrame(data.animation)
    }
  }, [])

  return (
    <section className={styles.container}>
      <section className={styles.carousel} ref={carouselRef}>
        {figureArray.map((value) => (
          <Link href="/" key={value}>
            <a
              href="/"
              className={styles.figure}
              style={{ backgroundColor: value }}
            >
              <img src={value} alt="banner" />
            </a>
          </Link>
        ))}
      </section>
      <div className={styles.indicator}>
        {[...Array(figureArray.length)].map((_, index) => (
          <div
            key={figureArray[index]}
            className={cn(
              styles.child,
              index === temporaryImages.indexOf(figureArray[0]) && styles.active,
            )}
          />
        ))}
      </div>
    </section>
  )
}
