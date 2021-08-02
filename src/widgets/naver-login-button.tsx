import { MouseEventHandler } from 'react'
import styles from 'sass/widgets/naver-login-button.module.scss'
import Icon from './icon'

export default function NaverLoginButton({
  onClick,
} : {
  onClick: MouseEventHandler
}) {
  return (
    <button className={styles.container} type="button" onClick={onClick}>
      <div className={styles.wrapper}>
        <Icon src="naver-logo.png" size={32} />
        <span className={styles.message}>네이버로 로그인하기</span>
      </div>
    </button>
  )
}
