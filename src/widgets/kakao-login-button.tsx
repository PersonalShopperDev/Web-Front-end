import { MouseEventHandler } from 'react'
import styles from 'sass/widgets/kakao-login-button.module.scss'
import Icon from './icon'

export default function KakaoLoginButton({
  onClick,
}: {
  onClick: MouseEventHandler
}) {
  return (
    <button className={styles.container} type="button" onClick={onClick}>
      <Icon className={styles.icon} src="kakao-logo.png" size={16} />
      <span className={styles.message}>카카오로 로그인하기</span>
    </button>
  )
}
