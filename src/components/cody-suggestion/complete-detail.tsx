/* eslint-disable no-shadow */
import React, { useState, useRef, useEffect } from 'react'
import styles from 'sass/components/complete-detail.module.scss'
import Avatar from 'widgets/avatar'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { CompleteSuggestionData } from 'templates/cody-suggestion/complete-suggestion'
import Link from 'next/link'
import Icon from 'widgets/icon'

export default function CompleteDetail({
  data,
}: {
  data: CompleteSuggestionData
}) {
  const {
    title, comment, clothes, referenceImgList, needRequest, supplier,
  } = data
  const [imageIndex, setImageIndex] = useState(0)
  const [imageModal, setImageModal] = useState(false)
  const [fixedHeight, setFixedHeight] = useState(0)
  const [initialIndex, setInitialIndex] = useState(0)
  const [modalIndex, setModalIndex] = useState(1)
  const imageModalRef = useRef()
  const slides = []
  const modalSlides = []
  const [rgba, setRgba] = useState([])
  const getRgba = () => {
    for (let i = 0; i < clothes.length; i++) {
      const rgba = [0, 0, 0, 0]
      const { img } = clothes[i]
      const image = new Image()
      image.crossOrigin = 'anonymous'
      image.src = img
      image.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = 180
        canvas.height = 333
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0, 180, 333)
        const d = ctx.getImageData(0, 0, 180, 333)
        const { data } = d
        for (let j = 0; j < data.length; j++) {
          if (j % 4 === 0) {
            rgba[0] += data[j]
          } else if (j % 4 === 1) {
            rgba[1] += data[j]
          } else if (j % 4 === 2) {
            rgba[2] += data[j]
          } else if (j % 4 === 3) {
            rgba[3] += (data[j] / 255)
          }
        }
        rgba[0] /= data.length
        rgba[1] /= data.length
        rgba[2] /= data.length
        rgba[3] /= data.length
        setRgba((prev) => [...prev, rgba])
      }
    }
  }
  useEffect(() => {
    getRgba()
  }, [])
  for (let i = 0; i < clothes.length; i++) {
    const { img, price, purchaseUrl } = clothes[i]
    slides.push(
      <SwiperSlide key={`slide-${i}`}>
        <div key={img}>
          {rgba[i]
          && <img src={img} className={styles.coordImg} alt={img} draggable="false" style={{ backgroundColor: `rgba(${rgba[i][0]},${rgba[i][1]},${rgba[i][2]},${rgba[i][3]})` }} />}
          <div className={styles.infoBox}>
            <Avatar size={28} src={supplier.img} />
            <span>
              {supplier.name}
              {' '}
              Stylist
            </span>
          </div>
          <span className={styles.title}>
            {title}
            {' '}
            <span className={styles.accent}>.</span>
          </span>
          <div className={styles.infoDetail}>
            <>
              <div className={styles.elemContainer}>
                <span>코디 번호</span>
                코디
                {' '}
                {i + 1}
              </div>
              <div className={styles.elemContainer}>
                <span>상품 가격</span>
                {price}
                원
              </div>
            </>
            <Link key={purchaseUrl} href={purchaseUrl}>
              <a href={purchaseUrl} target="_blank" rel="noreferrer">
                <div className={styles.purchaseLink}>
                  <span>구매링크</span>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </SwiperSlide>,
    )
  }
  for (let i = 0; i < referenceImgList.length; i++) {
    modalSlides.push(
      <SwiperSlide key={`slide-${i}`}>
        <img src={referenceImgList[i]} width="375px" height="375px" className={styles.img} alt="ref img" />
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

  const onClickEdit = async () => {
    // await communicate({
    //  url: `/coord/:${coordId}/edit`,
    //  method: 'POST',
    // })
  }

  const onClickConfirm = async () => {
    // await communicate({
    //  url: `/coord/:${coordId}/confirm`,
    //  method: 'POST',
    // })
  }
  return (
    <>
      <div className={styles.container}>
        <span className={styles.styleList}>Style List</span>
        <div className={styles.currentBar}>
          <span>1</span>
          <div className={styles.relative}>
            <div className={styles.productBar} />
            <div className={styles.current} style={{ width: `${((imageIndex + 1) * 100) / clothes.length}%` }} />
          </div>
          <span>{clothes.length}</span>
        </div>
        <Swiper onSlideChange={(e) => setImageIndex(e.realIndex)} initialSlide={0}>
          {slides}
        </Swiper>
        <section className={styles.tipContainer}>
          <span className={styles.tipTitle}>Style Tip</span>
          <p>
            {comment}
          </p>
        </section>
        <div className={styles.imgContainer}>
          {referenceImgList.map((item, index) => (
            <button
              type="button"
              onClick={() => onButtonClick(index)}
              key={Math.random()}
              className={styles.figure}
            >
              <img src={item} className={styles.refImg} alt="ref" key={item} />
            </button>
          ))}
        </div>
      </div>
      <div className={styles.bottomBarContainer}>
        {needRequest
        && (
        <button type="button" className={styles.editBtn} onClick={onClickEdit}>
          <span className={styles.buttonText}>코디 수정 요청</span>
        </button>
        ) }
        <button type="button" className={styles.confirmBtn} onClick={onClickConfirm}>
          <span className={styles.buttonText}>코디 확정</span>
        </button>
      </div>
      {imageModal
      && (
      <div className={styles.modalContainer} ref={imageModalRef} onClick={closeModal} aria-hidden="true">
        <span className={styles.text}>
          {modalIndex}
          {' / '}
          {modalSlides.length}
        </span>
        <Icon src="lookbookExit.png" size={24} onClick={onButtonClick} className={styles.exit} key="exit" />
        <Swiper onSlideChange={(e) => setModalIndex(e.realIndex + 1)} initialSlide={initialIndex}>
          {modalSlides}
        </Swiper>
      </div>
      )}
    </>
  )
}
