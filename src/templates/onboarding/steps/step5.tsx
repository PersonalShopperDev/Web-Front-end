import React, { useState, useEffect } from 'react'
import styles from 'sass/templates/onboarding/step5.module.scss'
import InputRange from 'components/input-range'
import { Gender, PriceLists } from '../index'

export default function Step5({
  gender,
  topPriceLists,
  bottomPriceLists,
  dressPriceLists,
  shoesPriceLists,
  bagPriceLists,
  accessoryPriceLists,
  hatPriceLists,
}: {
  gender: Gender
  topPriceLists: PriceLists
  bottomPriceLists: PriceLists
  dressPriceLists: PriceLists
  shoesPriceLists: PriceLists
  bagPriceLists: PriceLists
  accessoryPriceLists: PriceLists
  hatPriceLists: PriceLists
}) {
  const [priceLists, setPriceLists] = useState([])
  const [selectedItem, setSelectedItem] = useState([])
  const onClick = (index) => {
    if (!selectedItem.includes(index)) {
      setSelectedItem([...selectedItem, index])
    } else {
      setSelectedItem(selectedItem.filter((item) => item !== index))
    }
  }
  const femalePriceLists = [topPriceLists, bottomPriceLists, dressPriceLists,
    shoesPriceLists, bagPriceLists, accessoryPriceLists]
  const malePriceLists = [topPriceLists, bottomPriceLists, shoesPriceLists,
    bagPriceLists, hatPriceLists]
  useEffect(() => {
    if (gender === 'F') {
      setPriceLists(femalePriceLists)
    } else {
      setPriceLists(malePriceLists)
    }
  }, [])
  return (
    <section>
      <h1 className={styles.title}>STEP 5</h1>
      <h2 className={styles.content}>원하는 상품의 가격대를 선택해주세요</h2>
      <h3 className={styles.subContent}>
        쌀수록 좋은 경우는 슬라이더를 왼쪽 끝으로, 금액이 상관없는
        <br />
        경우는 슬라이더를 오른쪽 끝으로 밀어주세요.
      </h3>
      <div className={styles.container} id="step5_container">
        {priceLists.map((item, index) => (
          <div key={item.title}>
            <div className={styles.priceListContainer}>
              <button type="button" onClick={() => onClick(index)}>
                { selectedItem.includes(index)
                  ? <img src="/icons/selectedCheck.png" alt="selectedCheck" width="22" height="22" />
                  : <img src="/icons/check.png" alt="check" width="22" height="22" /> }
              </button>
              <span className={selectedItem.includes(index)
                ? styles.selectedText : null}
              >
                {item.title}
              </span>
            </div>
            {selectedItem.includes(index)
          && (
          <InputRange
            priceLists={item}
          />
          )}
          </div>
        ))}
      </div>
    </section>
  )
}
