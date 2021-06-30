import React from 'react'
import styles from 'sass/components/bottom-bar.module.scss'
import { useOnboarding } from 'providers/onboarding'

export default function bottomBar({
  stepIndex,
  totalIndexNum,
  onPrevButtonClick,
  onNextButtonClick,
}: {
  stepIndex: number
  totalIndexNum: number
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}) {
  const { information } = useOnboarding()
  const nextTitle = information !== null && information.userType === 'D' ? '확인하기' : '이동하기'
  return (
    <section className={styles.container}>
      {stepIndex === totalIndexNum || stepIndex === 1
        ? (
          <button
            type="button"
            onClick={() => onNextButtonClick()}
            className={styles.completeButton}
          >
            <span className={styles.nextText}>{stepIndex === 1 ? '다음' : nextTitle}</span>
          </button>
        )
        : (
          <>
            <button
              type="button"
              onClick={() => onPrevButtonClick()}
              className={styles.prevButton}
            >
              <img src="/icons/prevButton.png" alt="prevButton" width={6} height={13} />
            </button>
            <button
              type="button"
              onClick={() => onNextButtonClick()}
              className={styles.nextButton}
            >
              <span className={styles.nextText}>다음</span>
            </button>
          </>
        )}
    </section>
  )
}
