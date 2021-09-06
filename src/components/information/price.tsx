import React, { useState, useEffect } from 'react'
import InputRange from 'components/input-range'
import styles from 'sass/components/price.module.scss'
import { useOnboarding } from 'providers/onboarding'

interface PriceLists {
  title: string
  minPrice: number
  maxPrice: number
  key: string
}
export default function Price({
  isOnboarding,
  isEdit,
}: {
  isOnboarding?: boolean
  isEdit?: boolean
}) {
  const { information } = useOnboarding()
  const [priceLists, setPriceLists] = useState([])
  const [selectedItem, setSelectedItem] = useState([])
  const onClick = (index) => {
    if (!selectedItem.includes(index)) {
      setSelectedItem([...selectedItem, index])
    } else {
      setSelectedItem(selectedItem.filter((item) => item !== index))
    }
  }
  const topPriceLists: PriceLists = {
    title: '상의',
    minPrice: 5000,
    maxPrice: 100000,
    key: 'topPrice',
  }
  const bottomPriceLists: PriceLists = {
    title: '하의',
    minPrice: 5000,
    maxPrice: 70000,
    key: 'bottomPrice',
  }
  const dressPriceLists: PriceLists = {
    title: '원피스/세트',
    minPrice: 5000,
    maxPrice: 100000,
    key: 'dressPrice',
  }
  const shoesPriceLists: PriceLists = {
    title: '신발',
    minPrice: 10000,
    maxPrice: 100000,
    key: 'shoesPrice',
  }
  const bagPriceLists: PriceLists = {
    title: '가방',
    minPrice: 10000,
    maxPrice: 100000,
    key: 'bagPrice',
  }
  const accessoryPriceLists: PriceLists = {
    title: '악세사리',
    minPrice: 5000,
    maxPrice: 50000,
    key: 'accessoryPrice',
  }
  const hatPriceLists: PriceLists = {
    title: '모자/잡화',
    minPrice: 5000,
    maxPrice: 50000,
    key: 'hatPrice',
  }
  const femalePriceLists = [topPriceLists, bottomPriceLists, dressPriceLists,
    shoesPriceLists, bagPriceLists, accessoryPriceLists]
  const malePriceLists = [topPriceLists, bottomPriceLists, shoesPriceLists,
    bagPriceLists, hatPriceLists]
  useEffect(() => {
    if (information.gender === 'F') {
      setPriceLists(femalePriceLists)
    } else {
      setPriceLists(malePriceLists)
    }
  }, [])

  return (
    <>
      {isEdit
        ? (
          <div className={isOnboarding ? styles.container : styles.infoContainer} id="step5_container">
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
              isOnboarding={isOnboarding}
              isEdit={isEdit}
            />
            )}
              </div>
            ))}
          </div>
        )
        : (
          <>
            {priceLists.map((item) => {
              const { min, max } = information.clothPrice[item.key]
              return (
                <div key={item.title} className={styles.itemContainer}>
                  <span className={styles.itemTitle}>{item.title}</span>
                  <span className={styles.itemPrice}>
                    {min}
                    원 -
                    {' '}
                    {max}
                    원 대
                  </span>
                </div>
              )
            })}
          </>
        ) }
    </>
  )
}

Price.defaultProps = {
  isOnboarding: false,
  isEdit: true,
}
