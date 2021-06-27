import React from 'react'
import DemandStep4 from 'src/components/onboarding/demand-step4'
import SupplyStep4 from 'src/components/onboarding/supply-step4'
import { Gender, User } from '../index'

export default function Step4({
  user,
  gender,
  topSize,
  bottomSize,
  shoulderSize,
  waistSize,
  bellySize,
  hipSize,
  career,
  setTopSize,
  setBottomSize,
  setShoulderSize,
  setWaistSize,
  setBellySize,
  setHipSize,
  setCareer,
}: {
  user: User
  gender: Gender
  topSize: number
  bottomSize: number
  shoulderSize: number
  waistSize: number
  bellySize: number
  hipSize: number
  career: number
  setTopSize: (value: number) => void
  setBottomSize: (value: number) => void
  setShoulderSize: (value: number) => void
  setWaistSize: (value: number) => void
  setBellySize: (value: number) => void
  setHipSize: (value: number) => void
  setCareer: (value: number) => void
}) {
  return (
    <div>
      { user === 'D'
        ? (
          <DemandStep4
            gender={gender}
            topSize={topSize}
            bottomSize={bottomSize}
            shoulderSize={shoulderSize}
            waistSize={waistSize}
            bellySize={bellySize}
            hipSize={hipSize}
            setTopSize={setTopSize}
            setBottomSize={setBottomSize}
            setShoulderSize={setShoulderSize}
            setWaistSize={setWaistSize}
            setBellySize={setBellySize}
            setHipSize={setHipSize}
          />
        ) : (
          <SupplyStep4
            career={career}
            setCareer={setCareer}
          />
        ) }
    </div>
  )
}
