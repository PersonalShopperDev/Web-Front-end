import Link from 'next/link'
import styles from 'sass/widgets/avatar.module.scss'

export default function Avatar({
  src,
  size,
  href,
}: {
  src: string
  size?: number
  href?: string
}) {
  if (href) {
    return (
      <Link href={href}>
        <a href={href}>
          <Inner src={src} size={size} />
        </a>
      </Link>
    )
  }
  return <Inner src={src} size={size} />
}

function Inner({
  src,
  size,
}: {
  src: string
  size: number
}) {
  return (
    <figure
      className={styles.container}
      style={{ width: size, height: size }}
    >
      <img src={src} alt="avatar" />
    </figure>
  )
}

Avatar.defaultProps = {
  size: 32,
  href: null,
}
