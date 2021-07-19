import { useAuth } from 'providers/auth'
import { FormEvent } from 'react'
import styles from 'sass/templates/propose/form.module.scss'

export default function ProposeForm() {
  const { user } = useAuth()

  const { price } = user || {}

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <section className={styles.container} onSubmit={onSubmit}>
      <h2 className={styles.title}>김쇼퍼님에게 코디제안을 진행합니다.</h2>
      <form className={styles.form}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>제안하고 싶은 내용을 작성하세요.</legend>
          <textarea className={styles.textarea} placeholder="제안 내용을 입력하세요" />
        </fieldset>
        <div className={styles.fieldset}>
          <p className={styles.legend}>코디가격</p>
          <div className={styles.price}>{`${price.toLocaleString('ko-KR')}원`}</div>
        </div>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>계좌번호</legend>
          <input className={styles.bank} type="text" placeholder="은행이름" />
          <input className={styles.account} type="text" placeholder="계좌번호" />
        </fieldset>
        <input className={styles.submit} type="submit" value="견적보내기" />
      </form>
    </section>
  )
}
