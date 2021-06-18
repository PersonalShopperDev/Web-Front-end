import React from 'react'
import styles from 'sass/components/bottom-bar.module.scss'
import Image from 'next/image'

export default function bottomBar({
  index,
  nextStep,
  setIndex,
  setNextStep,
}: {
    index: Number,
    nextStep: boolean,
    setIndex: (value: number) => void;
    setNextStep: (value: boolean) => void;
}) {
  const onPrevButtonClick = () => {
    if (index > 1 && !nextStep) {
      setIndex(+index - 1)
    } else if (nextStep) {
      setNextStep(!nextStep)
    }
  }
  const onNextButtonClick = () => {
    if (index < 6) {
      if (index === 3 && !nextStep) {
        setNextStep(true)
      } else {
        setIndex(+index + 1)
      }
    } else if (index === 6) {
      console.log('welcome personal Shopper')
    }
  }
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

bottomBar.defaultProps = {
  index: 0,
}
