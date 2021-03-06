import React, { useEffect, useState } from 'react'
import TopBar from 'src/components/onboarding/top-bar'
import BottomBar from 'src/components/onboarding/bottom-bar'
import { useOnboarding } from 'providers/onboarding'
import { useRouter } from 'next/router'
import { useAuth } from 'providers/auth'
import styles from 'sass/templates/onboarding/step.module.scss'
import Step1 from './steps/step1'
import Step2 from './steps/step2'
import Step3 from './steps/step3'
import Step4 from './steps/step4'
import Step5 from './steps/step5'
import Step6 from './steps/step6'

export default function Onboarding() {
  const { requestAccessToken } = useAuth()
  const { information, putOnboardingInfo } = useOnboarding()
  const [stepIndex, setStepIndex] = useState(1)
  const [nextStep, setNextStep] = useState(false)
  const [stepTwoNext, setStepTwoNext] = useState(false)
  const [indexNum, setIndexNum] = useState(6)
  const router = useRouter()
  const step3 = 3
  const step2 = 2

  const stepComponents = [<Step1 />,
    <Step2 nextStep={stepTwoNext} />,
    <Step3
      nextStep={nextStep}
    />,
    <Step4 />, <Step5 />, <Step6 />]
  const onPrevButtonClick = () => {
    if (nextStep && stepIndex === step3) {
      setNextStep(!nextStep)
    } else if (stepTwoNext && stepIndex === step2) {
      setStepTwoNext(!stepTwoNext)
    } else {
      setStepIndex(+stepIndex - 1)
    }
  }
  const onNextButtonClick = async () => {
    if (stepIndex < indexNum) {
      if (stepIndex === step2 && !stepTwoNext) {
        setStepTwoNext(true)
      } else if (stepIndex === step3 && !nextStep && information.userType === 'D' && information.gender === 'F') {
        setNextStep(true)
      } else {
        setStepIndex(+stepIndex + 1)
      }
    } else if (stepIndex === indexNum) {
      await putOnboardingInfo()
      await requestAccessToken()
      router.push('/profile')
    }
  }

  useEffect(() => {
    if (information !== null && information.userType === 'S') {
      setIndexNum(5)
    } else {
      setIndexNum(6)
    }
  }, [information])

  return (
    <>
      <div className={styles.container}>
        <header className={styles.topBarConatiner}>
          <TopBar index={stepIndex} totalIndexNum={indexNum} />
        </header>
        <div className={styles.stepContainer} id="stepContainer">
          {stepComponents[stepIndex - 1]}
        </div>
      </div>
      <footer className={styles.bottomBarContainer}>
        <BottomBar
          onPrevButtonClick={onPrevButtonClick}
          onNextButtonClick={onNextButtonClick}
          stepIndex={stepIndex}
          totalIndexNum={indexNum}
        />
      </footer>
    </>
  )
}
