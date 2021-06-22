import React, { useEffect, useState } from 'react'
import styles from 'sass/components/input-range.module.scss'
import { PriceLists } from 'templates/onboarding/index'

export default function InputRange({
  priceLists,
}: {
  priceLists: PriceLists
}) {
  const priceStep = 5000
  let rangeLeft
  let rangeRight
  let thumbLeft
  let thumbRight
  let range
  const [minPrice, setMinPrice] = useState(priceLists.minPrice)
  const [maxPrice, setMaxPrice] = useState(priceLists.maxPrice)
  const setLeftValue = () => {
    rangeLeft.value = Math.min(parseInt(rangeLeft.value, 10),
      parseInt(rangeRight.value, 10) - priceStep)
    priceLists.setMinPrice(parseInt(rangeLeft.value, 10))
    setMinPrice(parseInt(rangeLeft.value, 10))
    const percent = ((parseInt(rangeLeft.value, 10) - priceLists.minPrice)
    / (priceLists.maxPrice - priceLists.minPrice)) * 100
    thumbLeft.style.left = `${percent}%`
    range.style.left = `${percent}%`
  }
  const setRightValue = () => {
    rangeRight.value = Math.max(parseInt(rangeRight.value, 10),
      parseInt(rangeLeft.value, 10) + priceStep)
    priceLists.setMaxPrice(parseInt(rangeRight.value, 10))
    setMaxPrice(parseInt(rangeRight.value, 10))
    const percent = ((parseInt(rangeRight.value, 10) - priceLists.minPrice)
    / (priceLists.maxPrice - priceLists.minPrice)) * 100
    thumbRight.style.right = `${100 - percent}%`
    range.style.right = `${100 - percent}%`
  }

  const scrollEventListner = () => {
    rangeLeft.style.top = `${range.getBoundingClientRect().top}px`
    rangeRight.style.top = `${range.getBoundingClientRect().top}px`
  }

  useEffect(() => {
    rangeLeft = document.getElementById(`${priceLists.title}+left`)
    rangeRight = document.getElementById(`${priceLists.title}+right`)
    thumbLeft = document.getElementById(`${priceLists.title}+thumb_left`)
    thumbRight = document.getElementById(`${priceLists.title}+thumb_right`)
    range = document.getElementById(`${priceLists.title}+range`)
    document.getElementById('step5_container').addEventListener('scroll', scrollEventListner)
    if (rangeLeft != null) rangeLeft.addEventListener('input', setLeftValue)
    if (rangeRight != null) rangeRight.addEventListener('input', setRightValue)
    return () => {
      rangeLeft.removeEventListener('input', setLeftValue)
      rangeRight.removeEventListener('input', setRightValue)
      document.removeEventListener('scroll', scrollEventListner)
    }
  }, [])

  return (
    <div className={styles.inputContainer}>
      <input type="range" min={priceLists.minPrice} max={priceLists.maxPrice} step={priceStep} defaultValue={priceLists.minPrice} id={`${priceLists.title}+left`} className={styles.rangeLeft} />
      <input type="range" min={priceLists.minPrice} max={priceLists.maxPrice} step={priceStep} defaultValue={priceLists.maxPrice} id={`${priceLists.title}+right`} className={styles.rangeRight} />
      <div className={styles.slider}>
        <div className={styles.track} />
        <div className={styles.range} id={`${priceLists.title}+range`} />
        <div className={styles.thumb_left} id={`${priceLists.title}+thumb_left`} />
        <div className={styles.thumb_right} id={`${priceLists.title}+thumb_right`} />
      </div>
      <div className={styles.flexContainer}>
        <span>
          {minPrice}
          원
        </span>
        <span>
          {maxPrice}
          원
        </span>
      </div>
    </div>
  )
}
