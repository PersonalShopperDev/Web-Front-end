import React from 'react'
import styles from 'sass/components/demand-step6.module.scss'
import StylePicture from 'components/information/style-picture'

export interface PriceLists {
  title: string
  minPrice: number
  maxPrice: number
  key: string
}

export default function DemandStep6() {
  return (
    <section>
      <h1 className={styles.title}>STEP 6</h1>
      <h2 className={styles.content}>다음 사진 중 마음에 드는 스타일을 골라주세요</h2>
      <span className={styles.text}>(최대 3개)</span>
      <StylePicture />
    </section>
  )
}
