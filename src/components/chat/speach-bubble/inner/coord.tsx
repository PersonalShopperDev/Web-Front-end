import { cn } from 'lib/util'
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
      return (
        [...Array(4)].map((_, index) => {
          if (index === 3) {
            return (
              <div key={imageList[index]} className={styles.imageWrapper}>
                <img className={styles.image} src={imageList[index]} alt="" />
                <div className={styles.background}>{`+${imageList.length - 4}`}</div>
              </div>
            )
          }
          return (
            <div key={imageList[index]} className={styles.imageWrapper}>
              <img className={styles.image} src={imageList[index]} alt="" />
            </div>
          )
        })
      )
    }

    return (
      imageList.map((image) => (
        <div key={image} className={styles.imageWrapper}>
          <img className={styles.image} src={image} alt="" />
        </div>
      ))
    )
  }

  return (
    <figure className={styles.container}>
      <h3 className={styles.title}>
        {children}
      </h3>
      <div className={cn(styles.imageContainer, imageList?.length > 1 && styles.x4)}>
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
