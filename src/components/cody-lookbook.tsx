import React, { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import 'swiper/swiper-bundle.css'
import styles from 'sass/components/cody-lookbook.module.scss'
import communicate from 'lib/api'
import Icon from 'widgets/icon'

export default function CodyLookBook({
  id,
} : {
  id: number,
}) {
  const [lookBook, setLookBook] = useState([])
  const [imageModal, setImageModal] = useState(false)
  const [imageIndex, setImageIndex] = useState(1)
  const [initialIndex, setInitialIndex] = useState(0)
  const imageModalRef = useRef()
  const slides = []
  for (let i = 0; i < 5; i++) {
    slides.push(
      <SwiperSlide key={`slide-${i}`}>
        <img src="/images/sample-avatar.jpg" width="375px" height="375px" className={styles.img} alt="코디 룩북" />
      </SwiperSlide>,
    )
  }
  const closeModal = (e) => {
    if (imageModalRef.current === e.target) setImageModal(false)
  }
  const onButtonClick = (index) => {
    setImageModal(!imageModal)
    setInitialIndex(index)
  }
  useEffect(() => {
    async function fetchLookBookData() {
      const res = await communicate({ url: `/profile/${id}/lookbook` })
      const information = await res.json()
      setLookBook(information.list)
    }
    fetchLookBookData()
  }, [id])
  return (
    <>
      <div className={styles.container}>
        {[...Array(5)].map((item, index) => (
          <button
            type="button"
            onClick={() => onButtonClick(index)}
          >
            <img src="/images/sample-avatar.jpg" width="104" height="104" className={styles.clothImage} alt="코디 룩북" />
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
        <Icon src="lookbookExit.png" size={24} onClick={onButtonClick} className={styles.exit} />
        <Swiper onSlideChange={(e) => setImageIndex(e.realIndex + 1)} initialSlide={initialIndex}>
          {slides}
        </Swiper>
      </div>
      )}
    </>
  )
}
