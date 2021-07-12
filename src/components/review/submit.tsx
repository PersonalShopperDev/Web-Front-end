import { MouseEventHandler } from 'react'
import styles from 'sass/components/review/submit.module.scss'

export default function Submit({ onClick }: { onClick: MouseEventHandler }) {
  return (
    <section className={styles.container}>
      <button type="button" className={styles.button} onClick={onClick}>
        작성하기
      </button>
    </section>
  )
}
