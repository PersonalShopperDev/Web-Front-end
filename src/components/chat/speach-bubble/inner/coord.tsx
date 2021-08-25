import Link from 'next/link'
import { ReactNode } from 'react'
import styles from 'sass/components/chat/speach-bubble/inner/coord.module.scss'

export default function Coord({
  id,
  imageList,
  children,
} : {
  id: number,
  imageList: string[]
  children: ReactNode,
}) {
  const href = `/suggestion/${id}`

  const getImage = () => {
    if (imageList.length > 4) {
      return [...Array(4)].map((_, index) => (
        <img key={imageList[index]} className={styles.image} src={imageList[index]} alt="" />
      ))
    }

    return imageList.map((image) => (
      <img key={image} className={styles.image} src={image} alt="" />
    ))
  }

  return (
    <figure className={styles.container}>
      <h3 className={styles.title}>
        {children}
      </h3>
      <div className={styles.imageWrapper}>
        {getImage()}
      </div>
      <Link href={href}>
        <a className={styles.button} href={href}>
          코디 보러가기
        </a>
      </Link>
    </figure>
  )
}
