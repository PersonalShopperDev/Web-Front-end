import React, { useState, useEffect } from 'react'
import styles from 'sass/templates/cody-suggestion/complete-suggestion.module.scss'
import Link from 'next/link'
import communicate from 'lib/api'

interface Clothes {
  img: string
  name: string
  price: number
  purchaseUrl: string
}
interface Data {
  mainImg: string,
  title: string,
  comment: string,
  clothes: Clothes[]
}
export default function CompleteSuggestion({
  coordId,
}: {
   coordId: number
}) {
  const [data, setData] = useState<Data>(null)

  useEffect(() => {
    const fetchCoordData = async () => {
      const res = await communicate({ url: `/coord?coordId=${coordId}` })
      if (res.status === 200) {
        const coordData = await res.json()
        setData(coordData)
      }
    }
    fetchCoordData()
  }, [])
  return (
    <>
      {data
    && (
    <div className={styles.container}>
      <div className={styles.styleBoard}>
        <img src={data.mainImg} width={342} height={359} alt="mainImg" />
      </div>
      <div className={styles.productContainer}>
        <span className={styles.title}>이 코디의 상품</span>
        <div className={styles.flexContainer}>
          {data.clothes.map((value) => (
            <Link href={value.purchaseUrl}>
              <a href={value.purchaseUrl} target="_blank" rel="noreferrer">
                <div className={styles.eachProduct}>
                  <img
                    src={value.img}
                    width={102}
                    height={102}
                    alt={value.name}
                    className={styles.img}
                  />
                </div>
                <div className={styles.nameText}>{value.name}</div>
                <div className={styles.priceText}>
                  ₩
                  {value.price}
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.stylingBox}>
        <span>스타일링 Tip</span>
        <span className={styles.contentText}>{data.comment}</span>
      </div>
    </div>
    ) }
    </>
  )
}
