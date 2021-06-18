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
  return (
    <>
      <header>
        <TopBar index={stepIndex} />
      </header>
      { stepIndex === 1
        ? <Step1 /> : stepIndex === 2
          ? <Step2 /> : stepIndex === 3
            ? <Step3 nextStep={nextStep} setNextStep={setNextStep} /> : stepIndex === 4
              ? <Step4 /> : stepIndex === 5
                ? <Step5 /> : <Step6 />}
      <section>
        <BottomBar index={stepIndex} setIndex={setStepIndex} nextStep={nextStep} setNextStep={setNextStep} />
      </section>
    </>
  )
}
