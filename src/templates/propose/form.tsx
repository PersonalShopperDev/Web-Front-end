import communicate from 'lib/api'
import ERROR_MESSAGE from 'lib/constants/error'
import { useRouter } from 'next/router'
import { useAuth } from 'providers/auth'
import { useAlert } from 'providers/dialog/alert/inner'
import { FormEvent, useRef, useEffect } from 'react'
import styles from 'sass/templates/propose/form.module.scss'

export default function AccountForm() {
  const router = useRouter()

  const { user } = useAuth()

  const { account, accountUser, bank } = user

  const { createAlert } = useAlert()

  const nameRef = useRef<HTMLInputElement>()
  const bankRef = useRef<HTMLInputElement>()
  const accoutRef = useRef<HTMLInputElement>()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const nameValue = nameRef.current.value
    const bankValue = bankRef.current.value
    const accountValue = accoutRef.current.value

    if (!nameValue || !bankValue || !accountValue) {
      await createAlert({ text: '빈칸을 채워 주세요' })
      return
    }

    const res = await communicate({
      url: '/profile',
      method: 'PATCH',
      payload: {
        accountUser: nameValue,
        bank: bankValue,
        account: accountValue,
      },
    })

    if (!res.ok) {
      await createAlert({ text: ERROR_MESSAGE })
      return
    }

    router.back()
  }

  useEffect(() => {
    nameRef.current.value = accountUser || ''
    bankRef.current.value = bank || ''
    accoutRef.current.value = account || ''
  }, [])

  return (
    <section className={styles.container} onSubmit={onSubmit}>
      <h2 className={styles.title}>
        계좌 정보를 입력해 주세요
      </h2>
      <form className={styles.form}>
        <div className={styles.fieldset}>
          <p className={styles.legend}>예금주</p>
          <input ref={nameRef} className={styles.bank} type="text" placeholder="이름" />
        </div>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>계좌정보</legend>
          <input ref={bankRef} className={styles.bank} type="text" placeholder="은행" />
          <input ref={accoutRef} className={styles.account} type="text" placeholder="계좌번호" />
        </fieldset>
        <input className={styles.submit} type="submit" value="확인" />
      </form>
    </section>
  )
}
