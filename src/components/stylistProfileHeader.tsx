import Image from 'next/image'
import Link from 'next/link'
import styles from '../../sass/profile.module.scss'

export default function Header() {
  return (
    <div className={styles.header}>
      <Link href="/">
        <button type="button">
          <Image src="/images/icons/Back.png" width="8.5" height="17" />
        </button>
      </Link>
      <Image src="/images/icons/menu.png" width="17.5" height="13" />
    </div>
  )
}
