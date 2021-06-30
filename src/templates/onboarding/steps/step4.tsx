import React from 'react'
import DemandStep4 from 'src/components/onboarding/demand-step4'
import SupplyStep4 from 'src/components/onboarding/supply-step4'
import { useOnboarding } from 'providers/onboarding'

export default function Step4() {
  const { information } = useOnboarding()
  return (
    <div>
      { information.userType === 'D'
        ? (
          <DemandStep4 />
        ) : (
          <SupplyStep4 />
        ) }
    </div>
  )
}
