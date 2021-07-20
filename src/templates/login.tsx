import { useKaKaoAuth } from 'providers/auth/kakao'
import { useNaverAuth } from 'providers/auth/naver'
import Icon from 'widgets/icon'
import styles from 'sass/templates/login.module.scss'
import Link from 'next/link'

export default function Login() {
  const { LoginButton: NaverLoginButton } = useNaverAuth()
  const { LoginButton: KaKaoLoginButton } = useKaKaoAuth()

  return (
    <section className={styles.container}>
      <div className={styles.background} />
      <h1 className={styles.logoContainer}>
        <Icon src="personal-login-logo.png" size={93} />
        <p>Personal Shopper</p>
      </h1>
      <div className={styles.buttonContainer}>
        {NaverLoginButton}
        {KaKaoLoginButton}
        <p className={styles.agree}>
          최초 로그인 시&nbsp;
          <Link href="/term/service">
            <a className={styles.link} href="/term/service">
              이용약관
            </a>
          </Link>
          ,&nbsp;
          <Link href="/term/privacy">
            <a className={styles.link} href="/term/privacy">
              개인정보 제공 및 수집/이용
            </a>
          </Link>
          에 동의하는 것으로 간주합니다.
        </p>
      </div>
    </section>
  )
}
