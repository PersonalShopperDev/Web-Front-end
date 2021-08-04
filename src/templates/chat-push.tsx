import { useAlert } from 'providers/dialog/alert/inner'
import { useRef, FormEvent } from 'react'
import styles from 'sass/templates/chat-push.module.scss'
import communicate from 'lib/api'
import ERROR_MESSAGE from 'lib/constants/error'

export default function ChatPush() {
  const inputRef = useRef<HTMLInputElement>()

  const { createAlert } = useAlert()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const { value } = inputRef.current

    if (!value) {
      await createAlert({ text: '전화번호를 입력해주세요.' })
      return
    }

    const res = await communicate({
      url: '/profile',
      payload: {
        phone: value,
      },
      method: 'PATCH',
    })

    if (!res.ok) {
      await createAlert({ text: ERROR_MESSAGE })
      return
    }

    await createAlert({ text: '문자 알림 수신이 확인되었습니다.' })
  }

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <h2>언제 메시지가 올지 몰라요!</h2>
      <div className={styles.message}>
        <p>번호를 남겨 주시면 메시지가 올 경우</p>
        <p>알림을 보내드리겠습니다.</p>
        <p>안심하세요! 개인정보는 안전하게 보관되니까요</p>
      </div>
      <label className={styles.inputWrapper} htmlFor="input-phonenumber">
        <span className={styles.label}>전화번호</span>
        <input ref={inputRef} className={styles.input} id="input-phonenumber" placeholder="010-0000-0000" type="tel" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" required autoComplete="off" />
      </label>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src="/images/push.png" alt="" />
      </div>
      <button className={styles.submit} type="submit">
        확인하기
      </button>
    </form>
  )
}
