import { useRouter } from 'next/router'
import { useAuth } from 'providers/auth'
import { FormEvent, useEffect, useRef } from 'react'
import styles from 'sass/templates/profile/info.module.scss'

export default function ProfileInfo() {
  const router = useRouter()

  const { user } = useAuth()
  const { name } = user

  const nicknameRef = useRef<HTMLInputElement>()
  const emailRef = useRef<HTMLInputElement>()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    router.back()
  }

  useEffect(() => {
    if (name) {
      nicknameRef.current.value = name
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
