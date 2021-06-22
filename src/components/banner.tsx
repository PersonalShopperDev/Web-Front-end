import { cn } from 'lib/util'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import styles from 'sass/components/banner.module.scss'

export interface BannerData {
  img: string,
}

export default function Banner({ data }: { data: BannerData[] }) {
  const [figureArray, setFigureArray] = useState(data)

  const carouselRef = useRef<HTMLElement>()

  const state = {
    animation: null,
    interval: 3000,
    timeout: null,
    current: 0,
    transition: 700,
  }

  const animate = () => {
    state.animation = requestAnimationFrame(animate)
    if (!carouselRef.current) {
      return
    }
    carouselRef.current.style.transform = `translateX(${state.current * -100}%)`
  }

  const tranistion = () => {
    if (!carouselRef.current) {
      return
    }
    carouselRef.current.style.transition = `transform ${state.transition}ms`
    state.current += 1
    state.timeout = setTimeout(arrange, state.transition)
  }

  const arrange = () => {
    if (!carouselRef.current) {
      return
    }
    carouselRef.current.style.transition = ''
    setFigureArray(([prev, ...rest]) => [...rest, prev])
    state.current = 0
  }

  useEffect(() => {
    state.timeout = setInterval(tranistion, state.interval)
    state.animation = requestAnimationFrame(animate)
    return () => {
      clearInterval(state.timeout)
      cancelAnimationFrame(state.animation)
    }
  }, [])

  return (
    <section className={styles.container}>
      <section className={styles.carousel} ref={carouselRef}>
        {figureArray.map(({ img }) => (
          <Link href="/" key={img}>
            <a
              href="/"
              className={styles.figure}
            >
              <img src={img} alt="banner" />
            </a>
          </Link>
        ))}
      </section>
      <div className={styles.indicator}>
        {[...Array(figureArray.length)].map((_, index) => (
          <div
            key={data[index].img}
            className={cn(
              styles.child,
              figureArray[0].img === data[index].img
                && styles.active,
            )}
          />
        ))}
      </div>
    </section>
  )
}
