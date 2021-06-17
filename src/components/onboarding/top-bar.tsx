import React from 'react'
import styles from 'sass/components/top-bar.module.scss'
import Image from 'next/image'

export default function topBar({
  index,
}: {
    index: Number,
}) {
  let key = 0
  return (
    <section className={styles.container}>
      {[...Array(6)].map(() => {
        key += 1
        return (
          <>
            { key === index
              ? <Image src="/icons/onboardingColoredTop.png" width="48" height="4" />
              : <Image src="/icons/onboardingTop.png" width="48" height="4" />}
          </>
        )
      })}
    </section>
  )
}

topBar.defaultProps = {
  index: 0,
}
