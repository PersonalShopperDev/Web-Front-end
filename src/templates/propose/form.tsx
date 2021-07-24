import { useRouter } from 'next/router'
import { useAuth } from 'providers/auth'
import { useRoom } from 'providers/chat/room'
import { useAlert } from 'providers/dialog/alert/inner'
import { FormEvent, useRef } from 'react'
import styles from 'sass/templates/propose/form.module.scss'

export default function ProposeForm() {
  const { room } = useRoom()

  const router = useRouter()

  const { user } = useAuth()

  const { createAlert } = useAlert()

  const { price } = user || {}

  const messageRef = useRef<HTMLTextAreaElement>()
  const bankRef = useRef<HTMLInputElement>()
  const accoutRef = useRef<HTMLInputElement>()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const message = messageRef.current.value
    const bank = bankRef.current.value
    const account = accoutRef.current.value

    if (!message || !bank || !account) {
      await createAlert({ text: '빈칸을 채워 주세요' })
      return
    }

    room.sendEstimate(message, price, account, bank)

    router.push(`/chat/${room.id}`)
  }

  return (
    <section className={styles.container} onSubmit={onSubmit}>
      <h2 className={styles.title}>
        {`${room.other.name}님에게 코디제안을 진행합니다`}
      </h2>
      <form className={styles.form}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>제안하고 싶은 내용을 작성하세요.</legend>
          <textarea ref={messageRef} className={styles.textarea} placeholder="제안 내용을 입력하세요" />
        </fieldset>
        <div className={styles.fieldset}>
          <p className={styles.legend}>코디가격</p>
          <div className={styles.price}>{`${price?.toLocaleString('ko-KR')}원`}</div>
        </div>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>계좌번호</legend>
          <input ref={bankRef} className={styles.bank} type="text" placeholder="은행이름" />
          <input ref={accoutRef} className={styles.account} type="text" placeholder="계좌번호" />
        </fieldset>
        <input className={styles.submit} type="submit" value="견적보내기" />
      </form>
    </section>
  )
}
