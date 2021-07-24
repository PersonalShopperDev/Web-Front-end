import Link from 'next/link'
import styles from 'sass/components/profile-preview/propose.module.scss'

export default function Propose({ id }: { id: string }) {
  const href = `/propose/new/${id}`

  return (
    <section className={styles.container}>
      <Link href={href}>
        <a href={href} className={styles.button}>
          견적 보내기
        </a>
      </Link>
    </section>
  )
}
