import { useState } from 'react'
import styles from 'sass/components/profile-preview/slide.module.scss'
import Icon from 'widgets/icon'

interface PreviewData {
  id: number
  img: string
}

export default function PreviewSlide({ data } : { data: PreviewData[] }) {
  const [current, setCurrent] = useState(0)

  const onPrev = () => {
    setCurrent((value) => value - 1)
  }

  const onNext = () => {
    setCurrent((value) => value + 1)
  }

  if (!data) {
    return <></>
  }

  if (data.length < 1) {
    return <></>
  }

  return (
    <section className={styles.container}>
      <div
        className={styles.list}
        style={{ transform: `translateX(${-1 * current * 100}%)` }}
      >
        {data.map(({ id, img }) => (
          <img key={id} className={styles.image} src={img} alt="" />
        ))}
      </div>
      <div className={styles.index}>{`${current + 1}/${data.length}`}</div>
      {current > 0 && (
        <button className={styles.leftArrow} type="button" onClick={onPrev}>
          <Icon src="right-arrow.png" size={38} />
        </button>
      )}
      {current < data.length - 1 && (
        <button className={styles.rightArrow} type="button" onClick={onNext}>
          <Icon src="right-arrow.png" size={38} />
        </button>
      )}
    </section>
  )
}
