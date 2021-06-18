import React from 'react'
import styles from 'sass/components/bottom-bar.module.scss'
import Image from 'next/image'

export default function bottomBar({
  onPrevButtonClick,
  onNextButtonClick,
}: {
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}) {
  return (
    <section className={styles.container}>
      <button
        type="button"
        onClick={() => onPrevButtonClick()}
        className={styles.prevButton}
      >
        <Image src="/icons/prevButton.png" width="6" height="13" />
      </button>
      <button
        type="button"
        onClick={() => onNextButtonClick()}
        className={styles.nextButton}
      >
        <span className={styles.nextText}>다음</span>
      </button>
    </section>
  )
}
