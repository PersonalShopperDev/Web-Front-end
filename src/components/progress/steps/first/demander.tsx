import communicate from 'lib/api'
import ERROR_MESSAGE from 'lib/constants/error'
import { useRoom } from 'providers/chat/room'
import { useAlert } from 'providers/dialog/alert/inner'
import { FormEvent, useRef } from 'react'
import styles from 'sass/components/progress/steps/first.module.scss'

export default function FirstStepForDemander() {
  const { room } = useRoom()

  const { estimateId } = room.latestEstimate

  const inputRef = useRef<HTMLInputElement>()

  const { createAlert } = useAlert()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const res = await communicate({
      url: `/estimate/${estimateId}/payer`,
      payload: {
        name: inputRef.current.value,
      },
      method: 'PUT',
    })

    if (!res.ok) {
      await createAlert({ text: ERROR_MESSAGE })
      return
    }

    room.pay(estimateId)
  }
  return (
    <>
      <p>안전거래를 위해 아래 계좌로 코디 가격을 이체해주세요.</p>
      <p className={styles.underline}>계좌:카카오뱅크 서유빈 3333-20-4598961</p>
      <br />
      <p>입금을 하셨다면 입금자명을 작성하시고’ 확인하기’ 버튼을 눌러주세요.</p>
      <form className={styles.form} onSubmit={onSubmit}>
        <input className={styles.input} ref={inputRef} type="text" placeholder="입금자명" />
        <input className={styles.submit} type="submit" value="확인하기" />
      </form>
    </>
  )
}
