import React from 'react'
import styles from 'sass/components/top-bar.module.scss'

export default function topBar({
  index,
  totalIndexNum,
}: {
    index: number,
    totalIndexNum: number,
}) {
  return (
    <section className={styles.container}>
      {[...Array(totalIndexNum)].map((value, idx) => (
        <div key={Math.random()}>
          { idx + 1 === index
            ? <img src="/icons/onboardingColoredTop.png" className={styles.icon} alt="topBar" />
            : <img src="/icons/onboardingTop.png" className={styles.icon} alt="coloredTopBar" />}
        </div>
      ))}
    </section>
  )
}

topBar.defaultProps = {
  index: 0,
}
