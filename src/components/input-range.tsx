import React, { useEffect, useState, useRef } from 'react'
import styles from 'sass/components/input-range.module.scss'
import { PriceLists } from 'components/onboarding/demand-step5'
import { useOnboarding } from 'providers/onboarding'

export default function InputRange({
  priceLists,
  isOnboarding,
}: {
  priceLists: PriceLists
  isOnboarding?: boolean,
}) {
  const { information, setData, setEdit } = useOnboarding()
  const priceStep = 5000
  const rangeLeftRef = useRef<HTMLInputElement>()
  const rangeRightRef = useRef<HTMLInputElement>()
  const thumbLeftRef = useRef<HTMLDivElement>()
  const thumbRightRef = useRef<HTMLDivElement>()
  const rangeRef = useRef<HTMLDivElement>()
  const [minPrice, setMinPrice] = useState(information[priceLists.key] === undefined
    ? priceLists.minPrice : information[priceLists.key].min)
  const [maxPrice, setMaxPrice] = useState(information[priceLists.key] === undefined
    ? priceLists.maxPrice : information[priceLists.key].max)

  const setLeftValue = () => {
    rangeLeftRef.current.value = Math.min(parseInt(rangeLeftRef.current.value, 10),
      parseInt(rangeRightRef.current.value, 10) - priceStep).toString()
    setData(priceLists.key, parseInt(rangeLeftRef.current.value, 10), true)
    if (!isOnboarding) setEdit('price')
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
    if (!isOnboarding) setEdit('price')
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
      if (!isOnboarding) setEdit('price')
    }
    if (rangeRightRef !== null) {
      rangeRightRef.current.addEventListener('input', setRightValue)
      setData(priceLists.key, parseInt(rangeRightRef.current.value, 10), false, true)
      if (!isOnboarding) setEdit('price')
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
  return (
    <div className={styles.container}>
      <input
        type="range"
        min={priceLists.minPrice}
        max={priceLists.maxPrice}
        step={priceStep}
        defaultValue={information[priceLists.key] === undefined
          ? priceLists.minPrice : information[priceLists.key].min}
        className={styles.rangeLeft}
        ref={rangeLeftRef}
      />
      <input
        type="range"
        min={priceLists.minPrice}
        max={priceLists.maxPrice}
        step={priceStep}
        defaultValue={information[priceLists.key] === undefined
          ? priceLists.maxPrice : information[priceLists.key].max}
        className={styles.rangeRight}
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
}
