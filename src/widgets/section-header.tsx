import Link from 'next/link'
import React from 'react'
import styles from 'sass/widgets/section-header.module.scss'
import Icon from './icon'

export default function SectionHeader({
  title,
  moreHref,
} : {
  title : React.ReactNode,
  moreHref : string,
}) {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <Link href="/">
        <a className={styles.more} href={moreHref}>
          more
          <Icon size={6} src="back-small.png" />
        </a>
      </Link>
    </section>
  )
}
