import React from 'react'
import styles from 'sass/components/top-bar.module.scss'

export default function topBar({
  index,
  indexNum,
}: {
    index: Number,
    indexNum: number,
}) {
  return (
    <section className={styles.container}>
      {[...Array(indexNum)].map((value, idx) => (
        <>
          { idx + 1 === index
            ? <img src="/icons/onboardingColoredTop.png" className={styles.icon} alt="topBar" />
            : <img src="/icons/onboardingTop.png" className={styles.icon} alt="coloredTopBar" />}
        </>
      ))}
    </section>
  )
}

topBar.defaultProps = {
  index: 0,
}
