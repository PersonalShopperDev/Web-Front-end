/* eslint-disable no-shadow */
import React, {
  useEffect, useState, useRef,
} from 'react'
import styles from 'sass/components/review.module.scss'
import Icon from 'widgets/icon'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { useReview } from 'providers/review'
import { useInfinityScroll } from 'providers/infinity-scroll'

export default function Review({
  id,
  reviewId,
  isProfile,
}: {
  id: number,
  reviewId?: number,
  isProfile?: boolean,
}) {
  const [slides, setSlids] = useState([])
  const [imageIndex, setImageIndex] = useState(1)
  const [imageModal, setImageModal] = useState(false)
  const [initialIndex, setInitialIndex] = useState(0)
  const [fixedHeight, setFixedHeight] = useState(0)
  const imageModalRef = useRef<HTMLDivElement>()
  const {
    review, reviewLists, setId, fetchReviewData, setTargetId,
  } = useReview()
  const { setOnScrollFunc } = useInfinityScroll()
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
  const closeModal = (e: React.MouseEvent) => {
    if (imageModalRef.current === e.target) {
      document.body.style.cssText = `position: relative; top:${-1 * window.scrollY}px;`
      setImageModal(false)
      window.scrollTo({ top: fixedHeight })
    }
  }
  useEffect(() => {
    setOnScrollFunc(fetchReviewData)
    setId(id)
    if (reviewId) setTargetId(reviewId)
  }, [])

  return (
    <>
      {isProfile && review && review.totalCount === 0
      && (
      <div className={styles.noreviewContainer}>
        <Icon src="profileReview.png" size={72} />
        <span>아직 등록된 리뷰가 없어요.</span>
      </div>
      )}
      <div className={styles.reviewContainer}>
        {review?.rating && !isProfile
        && (
        <div className={styles.reviewBox}>
          <div className={styles.leftItem}>
            <div className={styles.keyText}>평점</div>
            <span className={styles.valueText}>{review && review.rating}</span>
          </div>
          <div className={styles.rightItem}>
            <div className={styles.keyText}>리뷰</div>
            <span className={styles.valueText}>{review && review.totalCount}</span>
          </div>
        </div>
        ) }
        {reviewLists.map(({
          id, profileImg, name, date, rating, img, height, weight, body, styleTypeList, content,
        }) => (
          <div className={styles.userBox} key={id}>
            <div className={styles.userNameBox}>
              <div>
                <img src={profileImg} width={25} height={25} alt="프로필" className={styles.profileImg} />
                <span className={styles.nameText}>
                  {name}
                  님
                </span>
              </div>
              <span className={styles.dateText}>{date}</span>
            </div>
            <div className={styles.starBox}>
              <span>평점:</span>
              {[...Array(Math.round(rating))].map((value) => (
                <div key={Math.random()}>
                  <Icon src="filledStar.png" size={15} />
                </div>
              ))}
              {[...Array(5 - Math.round(rating))].map(() => (
                <div key={Math.random()}>
                  <Icon src="Star.png" size={15} />
                </div>
              ))}
              <span>
                {rating.toFixed(1)}
                점
              </span>
            </div>
            <div className={styles.coordContainer}>
              {img.map((value, index) => (
                <div key={value}>
                  <button type="button" onClick={() => onClickCoord(img, index)} className={styles.img}>
                    <img src={value} width="124" height="130" alt="코디" className={styles.img} />
                  </button>
                </div>
              ))}
            </div>
            <div className={styles.infoBox}>
              {height !== undefined && (
              <div>
                <span>키</span>
                {height}
                cm
              </div>
              )}
              {weight !== undefined && (
              <div>
                <span>몸무게</span>
                {weight}
                kg
              </div>
              )}
              <div>
                <span>체형</span>
                {body.value}
              </div>
              <div>
                <span>선호스타일</span>
                {styleTypeList.map((style) => (
                  <div className={styles.styleHashtag} key={style.id}>
                    #
                    {style.value}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.contentBox}>
              <span>{content}</span>
            </div>
          </div>
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

Review.defaultProps = {
  reviewId: null,
  isProfile: false,
}
