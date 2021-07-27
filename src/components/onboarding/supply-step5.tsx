import React from 'react'
import styles from 'sass/components/supply-step5.module.scss'
import Icon from 'widgets/icon'

export default function SupplyStep3() {
  return (
    <section className={styles.section}>
      <div className={styles.box}>
        <Icon src="welcomeSupply.png" size={490} className={styles.image} />
        <div className={styles.text}>
          퍼스널쇼퍼의 스타일리스트가 되신걸 환영합니다!
          <br />
          프로필을 완성하시면 서비스 오픈 후 코디 제안이 가능합니다.
          <br />
          프로필을 작성하러 가볼까요?
        </div>
      </div>
    </section>
  )
}
