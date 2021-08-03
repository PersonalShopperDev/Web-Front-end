import Link from 'next/link'
import styles from 'sass/components/are-you-noob.module.scss'

export default function AreYouNoob() {
  return (
    <Link href="/intro">
      <a className={styles.container} href="/intro">퍼스널 쇼퍼가 처음이신가요?</a>
    </Link>
  )
}
