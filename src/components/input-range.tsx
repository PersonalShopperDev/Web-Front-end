import React, { useEffect, useState, useRef } from 'react'
import styles from 'sass/components/input-range.module.scss'
import { PriceLists } from 'components/onboarding/demand-step5'
import { useOnboarding } from 'providers/onboarding'
import communicate from 'lib/api'

export default function InputRange({
  priceLists,
  isOnboarding,
  isEdit,
}: {
  priceLists: PriceLists
  isOnboarding?: boolean,
  isEdit?: boolean,
}) {
  const {
    information, setData, setOnEdit, fetchInformationData,
  } = useOnboarding()
  const priceStep = 5000
  const rangeLeftRef = useRef<HTMLInputElement>()
  const rangeRightRef = useRef<HTMLInputElement>()
  const thumbLeftRef = useRef<HTMLDivElement>()
  const thumbRightRef = useRef<HTMLDivElement>()
  const rangeRef = useRef<HTMLDivElement>()
  const priceRef = useRef(null)
  const [minPrice, setMinPrice] = useState(information.clothPrice === undefined
    ? priceLists.minPrice : information.clothPrice[priceLists.key].min)
  const [maxPrice, setMaxPrice] = useState(information.clothPrice === undefined
    ? priceLists.maxPrice : information.clothPrice[priceLists.key].max)

  const setLeftValue = () => {
    rangeLeftRef.current.value = Math.min(parseInt(rangeLeftRef.current.value, 10),
      parseInt(rangeRightRef.current.value, 10) - priceStep).toString()
    setData(priceLists.key, parseInt(rangeLeftRef.current.value, 10), true)
    if (information.clothPrice) {
      priceRef.current[priceLists.key].min = parseInt(rangeLeftRef.current.value, 10)
    }
    setMinPrice(parseInt(rangeLeftRef.current.value, 10))
    const percent = ((parseInt(rangeLeftRef.current.value, 10) - priceLists.minPrice)
    / (priceLists.maxPrice - priceLists.minPrice)) * 100
    thumbLeftRef.current.style.left = `${percent}%`
    rangeRef.current.style.left = `${percent}%`
  }
  const setRightValue = () => {
    rangeRightRef.current.value = Math.max(parseInt(rangeRightRef.current.value, 10),
      parseInt(rangeLeftRef.current.value, 10) + priceStep).toString()
    setData(priceLists.key, parseInt(rangeRightRef.current.value, 10), false, true)
    if (information.clothPrice) {
      priceRef.current[priceLists.key].max = parseInt(rangeRightRef.current.value, 10)
    }
    setMaxPrice(parseInt(rangeRightRef.current.value, 10))
    const percent = ((parseInt(rangeRightRef.current.value, 10) - priceLists.minPrice)
    / (priceLists.maxPrice - priceLists.minPrice)) * 100
    thumbRightRef.current.style.right = `${100 - percent}%`
    rangeRef.current.style.right = `${100 - percent}%`
  }

  const scrollEventListner = () => {
    if (rangeLeftRef.current !== null) rangeLeftRef.current.style.top = `${rangeRef.current.getBoundingClientRect().top}px`
    if (rangeRightRef.current !== null) rangeRightRef.current.style.top = `${rangeRef.current.getBoundingClientRect().top}px`
  }

  useEffect(() => {
    rangeLeftRef.current.style.top = `${rangeRef.current.getBoundingClientRect().top}px`
    rangeRightRef.current.style.top = `${rangeRef.current.getBoundingClientRect().top}px`
    if (rangeLeftRef !== null) {
      rangeLeftRef.current.addEventListener('input', setLeftValue)
      setData(priceLists.key, parseInt(rangeLeftRef.current.value, 10), true)
    }
    if (rangeRightRef !== null) {
      rangeRightRef.current.addEventListener('input', setRightValue)
      setData(priceLists.key, parseInt(rangeRightRef.current.value, 10), false, true)
    }
    thumbLeftRef.current.style.left = `${((parseInt(rangeLeftRef.current.value, 10) - priceLists.minPrice)
      / (priceLists.maxPrice - priceLists.minPrice)) * 100}%`
    rangeRef.current.style.left = `${((parseInt(rangeLeftRef.current.value, 10) - priceLists.minPrice)
      / (priceLists.maxPrice - priceLists.minPrice)) * 100}%`
    thumbRightRef.current.style.right = `${100 - ((parseInt(rangeRightRef.current.value, 10) - priceLists.minPrice)
      / (priceLists.maxPrice - priceLists.minPrice)) * 100}%`
    rangeRef.current.style.right = `${100 - ((parseInt(rangeRightRef.current.value, 10) - priceLists.minPrice)
      / (priceLists.maxPrice - priceLists.minPrice)) * 100}%`
  }, [rangeLeftRef, rangeRightRef])
  useEffect(() => {
    rangeLeftRef.current.addEventListener('input', setLeftValue)
    rangeRightRef.current.addEventListener('input', setRightValue)
    if (information.clothPrice) priceRef.current = information.clothPrice
    if (isOnboarding) {
      document.getElementById('stepContainer').addEventListener('scroll', scrollEventListner)
    } else {
      document.getElementById('main').addEventListener('scroll', scrollEventListner)
    }
    return () => {
      document.removeEventListener('scroll', scrollEventListner)
      if (rangeLeftRef.current !== null) rangeLeftRef.current.removeEventListener('input', setLeftValue)
      if (rangeRightRef.current !== null) rangeRightRef.current.removeEventListener('input', setRightValue)
    }
  }, [])

  const onEditPrice = async () => {
    const payload: any = {
      topPrice: priceRef.current.topPrice,
      bottomPrice: priceRef.current.bottomPrice,
      shoesPrice: priceRef.current.shoesPrice,
      bagPrice: priceRef.current.bagPrice,
    }

    if (information.gender === 'M') {
      payload.hatPrice = priceRef.current.hatPrice
    } else {
      payload.dressPrice = priceRef.current.dressPrice
      payload.accessoryPrice = priceRef.current.accessoryPrice
    }
    await communicate({ url: '/profile', payload: { clothPrice: payload }, method: 'PATCH' })
    fetchInformationData()
  }

  useEffect(() => {
    if (isEdit) setOnEdit(onEditPrice)
  }, [isEdit])

  return (
    <div className={styles.container}>
      <input
        type="range"
        min={priceLists.minPrice}
        max={priceLists.maxPrice}
        step={priceStep}
        defaultValue={information.clothPrice === undefined
          ? priceLists.minPrice : information.clothPrice[priceLists.key].min}
        className={styles.rangeLeft}
        ref={rangeLeftRef}
      />
      <input
        type="range"
        min={priceLists.minPrice}
        max={priceLists.maxPrice}
        step={priceStep}
        defaultValue={information.clothPrice === undefined
          ? priceLists.maxPrice : information.clothPrice[priceLists.key].max}
        className={!isEdit ? styles.rangeRight : styles.profileRight}
        ref={rangeRightRef}
      />
      <div className={styles.slider}>
        <div className={styles.track} />
        <div className={styles.range} ref={rangeRef} />
        <div className={styles.thumb_left} ref={thumbLeftRef} />
        <div className={styles.thumb_right} ref={thumbRightRef} />
      </div>
      <div className={styles.flexContainer}>
        {minPrice === priceLists.minPrice
          ? <span>무조건 저렴</span>
          : (
            <span>
              {minPrice}
              원
            </span>
          ) }
        {maxPrice === priceLists.maxPrice
          ? <span>럭셔리 선호</span>
          : (
            <span>
              {maxPrice}
              원
            </span>
          ) }
      </div>
    </div>
  )
}

InputRange.defaultProps = {
  isOnboarding: false,
  isEdit: false,
}
