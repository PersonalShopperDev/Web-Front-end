import Link from 'next/link'
import { ReactNode } from 'react'
import styles from 'sass/components/chat/speach-bubble/inner/coord.module.scss'

export default function Coord({
  id,
  image,
  children,
} : {
  id: number,
  image: string
  children: ReactNode,
}) {
  const href = `/suggestion?id=${id}`

  return (
    <figure className={styles.container}>
      <h3 className={styles.title}>
        {children}
      </h3>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={image} alt="" />
      </div>
      <Link href={href}>
        <a className={styles.button} href={href}>
          코디 보러가기
        </a>
      </Link>
    </figure>
  )
}
