import styles from 'sass/templates/progress/index.module.scss'
import { useState } from 'react'
import Step from 'components/progress/step'

export default function Progress() {
  const [step, setStep] = useState(0)

  return (
    <section className={styles.container}>
      <ol className={styles.list}>
        {steps.map((value, index) => (
          <Step key={value} index={index + 1} active={index === step}>
            {value}
          </Step>
        ))}
      </ol>
      <div className={styles.container}></div>
    </section>
  )
}

const steps = [
  '입금 요청',
  '입금 확인 중',
  '입금 확정',
  '코디 진행 중',
  '리뷰 작성',
]
