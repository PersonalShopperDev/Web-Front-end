import { FormEvent, useRef } from 'react'
import styles from 'sass/templates/pay.module.scss'

export default function Pay() {
  const price = 8000
  const receiver = '서유빈'
  const receiverAccount = '333-20-4598961'

  const nameRef = useRef()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <p className={styles.priceLabel}>코디가격</p>
      <p className={styles.price}>{`${price.toLocaleString('ko-KR')}원`}</p>
      <div className={styles.receiverInfo}>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>
            받는 이
          </span>
          <span className={styles.infoValue}>
            {receiver}
          </span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>
            입금 계좌번호
          </span>
          <span className={styles.infoValue}>
            {receiverAccount}
          </span>
        </div>
      </div>
      <label className={styles.inputLabel} htmlFor="sender-name">
        입금자 이름
        <input className={styles.input} ref={nameRef} placeholder="입금자 이름" type="text" id="sender-name" autoComplete="off" />
      </label>
      <section className={styles.notice}>
        <h5 className={styles.noticeLabel}>안내사항</h5>
        <p className={styles.noticeMessage}>안전거래로 진행됩니다. 어쩌구 공지</p>
      </section>
      <div className={styles.enoughSpace} />
      <div className={styles.submitWrapper}>
        <button className={styles.submit} type="button">
          확인하기
        </button>
      </div>
    </form>
  )
}
