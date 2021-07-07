import React from 'react'
import styles from 'sass/components/demand-step3.module.scss'
import { useOnboarding } from 'providers/onboarding'
import Body from 'components/information/body'
import Skin from 'components/information/skin'

export default function DemandStep3({
  nextStep,
}: {
  nextStep: boolean,
}) {
  const { information } = useOnboarding()
  return (
    <section className={styles.container}>
      {!nextStep
        ? (
          <>
            <h1 className={styles.title}>STEP 3-1</h1>
            <h2 className={styles.content}>다음 중 자신과 제일 유사한 체형을 골라주세요</h2>
            <Body isEdit isOnboarding />
          </>
        )
        : (information.gender === 'F'
          && (
          <>
            <h1 className={styles.title}>STEP 3-2</h1>
            <h2 className={styles.content}>당신에게 적합한 톤을 알려주세요</h2>
            <h3 className={styles.subContent}>가장 마음에 드는 팔레트를 골라주세요.</h3>
            <div className={styles.paletteContainer}>
              <Skin isEdit />
            </div>
          </>
          )
        )}
    </section>
  )
}
