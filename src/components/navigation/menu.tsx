import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from 'sass/components/navigation.module.scss'

export default function Menu({
  href,
  title,
  selectedPath,
  notSelectedPath,
  className,
}: {
  href: string
  title: string
  selectedPath: string
  notSelectedPath: string
  className: string
}) {
  const router = useRouter()

  const isCurrentPath = () => {
    const { asPath } = router
    if (href === '/') {
      return asPath === href || asPath.includes('users')
    }
    return asPath.includes(href)
  }

  return (
    <Link href={href === 'none' ? '/' : href}>
      <a className={className} href={href === 'none' ? '/' : href}>
        <div className={styles.imageWrapper}>
          <img
            src={isCurrentPath() ? selectedPath : notSelectedPath}
            alt={title}
            width={37}
            height={37}
          />
        </div>
        <span
          className={
            isCurrentPath() ? styles.selectedText : styles.notSelectedText
          }
        >
          {title}
        </span>
      </a>
    </Link>
  )
}
