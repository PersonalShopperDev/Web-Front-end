import { useProfile } from 'providers/profile'
import { useEffect, useRef } from 'react'
import styles from 'sass/components/profile/account.module.scss'
import StatefulSection, { useStatefulSection } from './stateful-section'

export default function Account() {
  return (
    <StatefulSection head="안전거래 계좌">
      <Inner />
    </StatefulSection>
  )
}

function Inner() {
  const { state, setState, setOnEdit } = useStatefulSection()

  const { user } = useProfile()
  const { account, bank, accountUser } = user

  const accountUserRef = useRef<HTMLInputElement>()
  const accountRef = useRef<HTMLInputElement>()
  const bankRef = useRef<HTMLInputElement>()

  const onEdit = async () => {
    setState('default')
  }

  useEffect(() => {
    setOnEdit(onEdit)
    if (state !== 'edit') {
      return
    }
    accountUserRef.current.value = accountUser
    bankRef.current.value = bank
    accountRef.current.value = account
  }, [state])

  return (
    <div className={styles.container}>
      {state === 'edit' ? (
        <>
          <div className={styles.inputContainer}>
            <div className={styles.label}>
              예금주
            </div>
            <input ref={accountUserRef} className={styles.input} type="text" placeholder="예금주" autoComplete="off" />
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.label}>
              은행이름
            </div>
            <input ref={bankRef} className={styles.input} type="text" placeholder="은행이름" autoComplete="off" />
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.label}>
              계좌번호
            </div>
            <input ref={accountRef} className={styles.input} type="text" placeholder="계좌번호" autoComplete="off" />
          </div>
        </>
      ) : (
        <div className={styles.text}>
          {`${accountUser} ${bank} ${account}`}
        </div>
      )}
    </div>
  )
}
