import React from 'react'
import DemandStep5 from 'src/components/onboarding/demand-step5'
import SupplyStep5 from 'src/components/onboarding/supply-step5'
import { useOnboarding } from 'providers/onboarding'

export default function Step5() {
  const { information } = useOnboarding()
  return (
    <>
      {information.userType === 'D'
        ? (
          <DemandStep5 />
        ) : <SupplyStep5 />}
    </>
  )
}
