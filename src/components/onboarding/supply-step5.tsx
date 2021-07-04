import React from 'react'
import styles from 'sass/components/supply-step5.module.scss'

export default function SupplyStep3() {
  return (
    <section>
      <img src="/icons/welcomeSupply.png" alt="selectedIcons" className={styles.image} />
      <div className={styles.container}>
        <span>스타일리스트로 오신걸 환영합니다~</span>
        <span>프로필을 완성하여 사용자와 매칭해보세요</span>
      </div>
    </section>
  )
}
