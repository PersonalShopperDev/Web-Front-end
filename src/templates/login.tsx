import { useKaKaoAuth } from 'providers/auth/kakao'
import { useNaverAuth } from 'providers/auth/naver'
import Icon from 'widgets/icon'
import styles from 'sass/templates/login.module.scss'

export default function Login() {
  const { LoginButton: NaverLoginButton } = useNaverAuth()
  const { LoginButton: KaKaoLoginButton } = useKaKaoAuth()

  return (
    <section className={styles.container}>
      <h1 className={styles.logoContainer}>
        <Icon src="personal-login-logo.png" size={93} />
        <p>Personal Shopper</p>
      </h1>
      <div className={styles.buttonContainer}>
        {NaverLoginButton}
        {KaKaoLoginButton}
      </div>
    </section>
  )
}
