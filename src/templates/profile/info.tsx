import communicate from 'lib/api'
import ERROR_MESSAGE from 'lib/constants/error'
import { useRouter } from 'next/router'
import { useAuth } from 'providers/auth'
import { useAlert } from 'providers/dialog/alert/inner'
import { FormEvent, useEffect, useRef } from 'react'
import styles from 'sass/templates/profile/info.module.scss'

export default function ProfileInfo() {
  const router = useRouter()

  const { user, fetchUser } = useAuth()
  const { name, email } = user

  const { createAlert } = useAlert()

  const nicknameRef = useRef<HTMLInputElement>()
  const emailRef = useRef<HTMLInputElement>()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const nicknameValue = nicknameRef.current.value
    const emailValue = emailRef.current.value

    if (!nicknameValue || !emailValue) {
      await createAlert({ text: '모든 항목을 채워 주세요.' })
      return
    }

    const res = await communicate({
      url: '/profile',
      payload: {
        email: emailValue,
        name: nicknameValue,
      },
      method: 'PATCH',
    })

    if (res.status !== 200) {
      await createAlert({ text: ERROR_MESSAGE })
      return
    }

    await fetchUser()

    router.back()
  }

  useEffect(() => {
    if (name) {
      nicknameRef.current.value = name
      emailRef.current.value = email
    }
  }, [])

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <fieldset className={styles.form}>
        <label className={styles.row} htmlFor="nickname">
          <span className={styles.label}>닉네임</span>
          <input
            ref={nicknameRef}
            id="nickname"
            className={styles.input}
            type="text"
          />
        </label>
        <label className={styles.row} htmlFor="email">
          <span className={styles.label}>이메일</span>
          <input
            ref={emailRef}
            id="email"
            className={styles.input}
            type="text"
          />
        </label>
      </fieldset>
      <input className={styles.submit} type="submit" value="수정하기" />
    </form>
  )
}
