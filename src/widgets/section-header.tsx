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
      <Link href={moreHref}>
        <a className={styles.more} href={moreHref}>
          <span>more</span>
          <Icon size={7} src="back-small.png" />
        </a>
      </Link>
    </section>
  )
}
