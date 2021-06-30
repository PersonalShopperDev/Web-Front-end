import React from 'react'
import styles from 'sass/components/top-bar.module.scss'
import { useOnboarding } from 'providers/onboarding'

export default function topBar({
  index,
  totalIndexNum,
}: {
    index: number,
    totalIndexNum: number,
}) {
  const { information } = useOnboarding()
  return (
    <section className={styles.container}>
      {information !== null && information.userType === 'S' && index === totalIndexNum ? null : [...Array(totalIndexNum)].map((value, idx) => (
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
