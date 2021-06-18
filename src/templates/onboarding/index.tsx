import React, { useState } from 'react'
import TopBar from 'src/components/onboarding/top-bar'
import BottomBar from 'src/components/onboarding/bottom-bar'
import Step1 from './steps/step1'
import Step2 from './steps/step2'
import Step3 from './steps/step3'
import Step4 from './steps/step4'
import Step5 from './steps/step5'
import Step6 from './steps/step6'

export default function Onboarding() {
  const [stepIndex, setStepIndex] = useState(1)
  const [nextStep, setNextStep] = useState(false)
  const indexNum = 6
  const step3 = 3
  const stepComponents = [<Step1 />, <Step2 />,
    <Step3 nextStep={nextStep} setNextStep={setNextStep} />, <Step4 />, <Step5 />, <Step6 />]
  const onPrevButtonClick = () => {
    if (stepIndex > 1 && !nextStep) {
      setStepIndex(+stepIndex - 1)
    } else if (nextStep) {
      setNextStep(!nextStep)
    }
  }
  const onNextButtonClick = () => {
    if (stepIndex < indexNum) {
      if (stepIndex === step3 && !nextStep) {
        setNextStep(true)
      } else {
        setStepIndex(+stepIndex + 1)
      }
    } else if (stepIndex === indexNum) {
      console.log('welcome personal Shopper')
    }
  }
  return (
    <>
      <header>
        <TopBar index={stepIndex} indexNum={indexNum} />
      </header>
      {stepComponents[stepIndex - 1]}
      <section>
        <BottomBar
          onPrevButtonClick={onPrevButtonClick}
          onNextButtonClick={onNextButtonClick}
        />
      </section>
    </>
  )
}
