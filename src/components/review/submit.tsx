import { MouseEventHandler } from 'react'
import styles from 'sass/components/review/submit.module.scss'

export default function Submit({ onClick }: { onClick: MouseEventHandler }) {
  return (
    <button type="button" className={styles.container} onClick={onClick}>
      작성하기
    </button>
  )
}
