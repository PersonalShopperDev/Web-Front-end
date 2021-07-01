import React from 'react'
import DemandStep3 from 'src/components/onboarding/demand-step3'
import SupplyStep3 from 'src/components/onboarding/supply-step3'
import { useOnboarding } from 'providers/onboarding'

export default function Step3({
  nextStep,
}: {
  nextStep: boolean,

}) {
  const { information } = useOnboarding()
  return (
    <div>
      {information.userType === 'D'
        ? (
          <DemandStep3
            nextStep={nextStep}
          />
        ) : (
          <SupplyStep3 />
        )}
    </div>
  )
}
