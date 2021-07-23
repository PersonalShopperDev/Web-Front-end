import Link from 'next/link'
import styles from 'sass/components/login-banner.module.scss'

export default function LoginBanner() {
  return (
    <section className={styles.container}>
      <p className={styles.paragraph}>
        로그인하고
        <br />
        스타일리스트에게
        <br />
        <strong className={styles.highlight}>코디를 제안</strong>
        받아보세요!
      </p>
      <img className={styles.illustration} src="/images/login-banner.png" alt="" />
      <Link href="/login">
        <a href="/login" className={styles.button} type="button">
          로그인하기
        </a>
      </Link>
    </section>
  )
}
