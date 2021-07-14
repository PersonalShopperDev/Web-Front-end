import React from 'react'
import styles from 'sass/components/supply-step5.module.scss'
import Icon from 'widgets/icon'

export default function SupplyStep3() {
  return (
    <section className={styles.section}>
      <div className={styles.box}>
        <Icon src="welcomeSupply.png" size={490} className={styles.image} />
        <div className={styles.text}>
          스타일리스트로 오신걸 환영합니다~
          <br />
          프로필을 완성하여 사용자와 매칭해보세요
        </div>
      </div>
    </section>
  )
}
