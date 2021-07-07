import React, {
  useEffect, useState, useRef,
} from 'react'
import styles from 'sass/components/review.module.scss'
import communicate from 'lib/api'
import Icon from 'widgets/icon'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'

export default function Review({
  id,
}: {
  id: number,
}) {
  const [review, setReview] = useState(null)
  const [slides, setSlids] = useState([])
  const [imageIndex, setImageIndex] = useState(1)
  const [imageModal, setImageModal] = useState(false)
  const [initialIndex, setInitialIndex] = useState(0)
  const [fixedHeight, setFixedHeight] = useState(0)
  const imageModalRef = useRef()
  const onClickCoord = (img, index) => {
    if (!imageModal) {
      setFixedHeight(document.documentElement.scrollTop)
      document.body.style.cssText = 'position:fixed; left:0; right:0; margin: 0 auto '
    } else {
      document.body.style.cssText = `position: relative; top:${-1 * window.scrollY}px;`
      window.scrollTo({ top: fixedHeight })
    }
    setSlids(img)
    setImageModal(!imageModal)
    setInitialIndex(index)
    setImageIndex(index + 1)
  }
  const onExitClick = () => {
    if (!imageModal) {
      setFixedHeight(document.documentElement.scrollTop)
      document.body.style.cssText = 'position:fixed; left:0; right:0; margin: 0 auto '
    } else {
      document.body.style.cssText = `position: relative; top:${-1 * window.scrollY}px;`
      window.scrollTo({ top: fixedHeight })
    }
    setImageModal(!imageModal)
  }
  const closeModal = (e) => {
    if (imageModalRef.current === e.target) {
      document.body.style.cssText = `position: relative; top:${-1 * window.scrollY}px;`
      setImageModal(false)
      window.scrollTo({ top: fixedHeight })
    }
  }
  useEffect(() => {
    async function fetchReviewData() {
      const res = await communicate({ url: `/profile/${id}/review` })
      const reviews = await res.json()
      setReview(reviews)
    }
    fetchReviewData()
  }, [])
  return (
    <>
      {review !== null
    && (
    <div className={styles.reviewContainer}>
      <div className={styles.reviewBox}>
        <div className={styles.leftItem}>
          <div className={styles.keyText}>평점</div>
          <span className={styles.valueText}>{review.rating}</span>
        </div>
        <div className={styles.rightItem}>
          <div className={styles.keyText}>리뷰</div>
          <span className={styles.valueText}>{review.totalCount}</span>
        </div>
      </div>
      {review.list.map((item) => (
        <div className={styles.userBox} key={item.id}>
          <div className={styles.userNameBox}>
            <div>
              <Icon src={item.profileImg} size={25} key="profile" />
              <span className={styles.nameText}>
                {item.name}
                님
              </span>
            </div>
            <span className={styles.dateText}>{item.date}</span>
          </div>
          <div className={styles.starBox}>
            <span>평점:</span>
            {[...Array(Math.round(item.rating))].map((value) => (
              <div key={Math.random()}>
                <Icon src="filledStar.png" size={15} />
              </div>
            ))}
            {[...Array(5 - Math.round(item.rating))].map(() => (
              <div key={Math.random()}>
                <Icon src="Star.png" size={15} />
              </div>
            ))}
            <span>
              {item.rating.toFixed(1)}
              점
            </span>
          </div>
          <div className={styles.coordContainer}>
            {item.img.map((value, index) => (
              <div>
                <button type="button" onClick={() => onClickCoord(item.img, index)} className={styles.img}>
                  <img src={value} width="124" height="130" alt="코디" />
                </button>
              </div>
            ))}
          </div>
          <div className={styles.infoBox}>
            {item.height !== undefined && (
            <div>
              <span>키</span>
              {item.height}
              cm
            </div>
            )}
            {item.weight !== undefined && (
            <div>
              <span>몸무게</span>
              {item.weight}
              kg
            </div>
            )}
            <div>
              <span>체형</span>
              {item.body.value}
            </div>
            <div>
              <span>선호스타일</span>
              {item.styleTypeList.map((style) => (
                <div className={styles.styleHashtag} key={style.id}>
                  #
                  {style.value}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.contentBox}>
            <span>{item.content}</span>
          </div>
        </div>
      ))}
    </div>
    )}
      {imageModal
      && (
      <div className={styles.modalContainer} ref={imageModalRef} onClick={closeModal} aria-hidden="true">
        <span className={styles.text}>
          {imageIndex}
          {' / '}
          {slides.length}
        </span>
        <Icon src="lookbookExit.png" size={24} onClick={onExitClick} className={styles.exit} key="exit" />
        <Swiper
          onSlideChange={(e) => setImageIndex(e.realIndex + 1)}
          initialSlide={initialIndex}
        >
          {slides.map((item) => (
            <SwiperSlide key={`slide-${Math.random()}`}>
              <img src={item} width="375px" height="375px" className={styles.img} alt="코디" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      )}
    </>
  )
}
