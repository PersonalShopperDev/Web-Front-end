import communicate from 'lib/api'
import ERROR_MESSAGE from 'lib/constants/error'
import { useRouter } from 'next/router'
import { useAlert } from 'providers/dialog/alert/inner'
import { FormEvent, useRef } from 'react'
import styles from 'sass/templates/pay.module.scss'

export default function Pay({
  roomId,
  price,
} : {
  roomId: number,
  price: number
}) {
  const router = useRouter()

  const receiver = '서유빈'
  const receiverAccount = '333-20-4598961'

  const nameRef = useRef<HTMLInputElement>()

  const { createAlert } = useAlert()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const { value } = nameRef.current

    if (!value) {
      createAlert({ text: '입금자 이름을 입력해주세요.' })
      return
    }

    const res = await communicate({
      url: `/payment/${roomId}/account`,
      payload: {
        name: value,
      },
      method: 'POST',
    })

    if (!res.ok) {
      await createAlert({ text: ERROR_MESSAGE })
      return
    }

    await createAlert({ text: '입금자 이름을 성공적으로 제출했습니다.' })

    router.back()
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
        <p className={styles.noticeMessage}>
          퍼스널쇼퍼는 코디 완료 후 스타일리스트에게 돈을 지급합니다. 안전하게 거래를 이용하세요:&#41;
        </p>
      </section>
      <div className={styles.enoughSpace} />
      <div className={styles.submitWrapper}>
        <button className={styles.submit} type="submit">
          확인하기
        </button>
      </div>
    </form>
  )
}
