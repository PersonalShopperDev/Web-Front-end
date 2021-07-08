import React from 'react'
import styles from 'sass/components/demand-step5.module.scss'
import Price from 'components/information/price'

export interface PriceLists {
  title: string
  minPrice: number
  maxPrice: number
  key: string
}

export default function DemandStep5() {
  return (
    <section>
      <h1 className={styles.title}>STEP 5</h1>
      <h2 className={styles.content}>원하는 상품의 가격대를 선택해주세요</h2>
      <h3 className={styles.subContent}>
        쌀수록 좋은 경우는 슬라이더를 왼쪽 끝으로, 금액이 상관없는
        <br />
        경우는 슬라이더를 오른쪽 끝으로 밀어주세요.
      </h3>
      <Price isEdit isOnboarding />
    </section>
  )
}
