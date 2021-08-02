import React, { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import styles from 'sass/components/cody-lookbook.module.scss'
import Icon from 'widgets/icon'
import { useInfinityScroll } from 'providers/infinity-scroll'
import { useLookBook } from 'providers/look-book'

export default function CodyLookBook({
  id,
} : {
  id: number,
}) {
  const [imageModal, setImageModal] = useState(false)
  const [imageIndex, setImageIndex] = useState(1)
  const [initialIndex, setInitialIndex] = useState(0)
  const [fixedHeight, setFixedHeight] = useState(0)
  const { lookBookLists, setId, fetchLookBookData } = useLookBook()
  const { setOnScrollFunc } = useInfinityScroll()
  const imageModalRef = useRef()

  const slides = []
  for (let i = 0; i < lookBookLists.length; i++) {
    slides.push(
      <SwiperSlide key={`slide-${i}`}>
        <img src={lookBookLists[i].img} width="375px" height="375px" className={styles.img} alt="코디 룩북" />
      </SwiperSlide>,
    )
  }
  const closeModal = (e) => {
    if (imageModalRef.current === e.target) {
      document.body.style.cssText = `position: relative; top:${-1 * window.scrollY}px;`
      setImageModal(false)
      window.scrollTo({ top: fixedHeight })
    }
  }
  const onButtonClick = (index) => {
    if (!imageModal) {
      setFixedHeight(document.documentElement.scrollTop)
      document.body.style.cssText = 'position:fixed; left:0; right:0; margin: 0 auto '
    } else {
      document.body.style.cssText = `position: relative; top:${-1 * window.scrollY}px;`
      window.scrollTo({ top: fixedHeight })
    }
    setImageModal(!imageModal)
    setInitialIndex(index)
  }

  useEffect(() => {
    setId(id)
    setOnScrollFunc(fetchLookBookData)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {lookBookLists.map((item, index) => (
          <button
            type="button"
            onClick={() => onButtonClick(index)}
            key={Math.random()}
            className={styles.figure}
          >
            <img src={item.img} alt="코디 룩북" />
          </button>
        ))}
      </div>
      {imageModal
      && (
      <div className={styles.modalContainer} ref={imageModalRef} onClick={closeModal} aria-hidden="true">
        <span className={styles.text}>
          {imageIndex}
          {' / '}
          {slides.length}
        </span>
        <Icon src="lookbookExit.png" size={24} onClick={onButtonClick} className={styles.exit} key="exit" />
        <Swiper onSlideChange={(e) => setImageIndex(e.realIndex + 1)} initialSlide={initialIndex}>
          {slides}
        </Swiper>
      </div>
      )}
    </div>
  )
}
