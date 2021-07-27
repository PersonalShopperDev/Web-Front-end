import styles from 'sass/templates/progress/index.module.scss'
import { useState } from 'react'
import Step from 'components/progress/step'
import { useAuth } from 'providers/auth'
import Steps from 'components/progress/steps'

export default function Progress() {
  const { userType } = useAuth().user

  const [step, setStep] = useState(3)

  const defaultSteps = [
    '입금 요청',
    '입금 확인 중',
  ]

  const steps = userType === 'D'
    ? defaultSteps.concat('코디 진행', '리뷰 작성')
    : defaultSteps.concat('입금 확정')

  return (
    <section className={styles.container}>
      <ol className={styles.list}>
        {steps.map((value, index) => (
          <Step key={value} index={index + 1} active={index === step}>
            {value}
          </Step>
        ))}
      </ol>
      <Steps index={step} />
    </section>
  )
}
