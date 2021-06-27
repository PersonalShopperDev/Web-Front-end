import React from 'react'
import DemandStep5 from 'src/components/onboarding/demand-step5'
import SupplyStep5 from 'src/components/onboarding/supply-step5'
import { User, Gender, PriceLists } from '../index'

export default function Step5({
  user,
  gender,
  topPriceLists,
  bottomPriceLists,
  dressPriceLists,
  shoesPriceLists,
  bagPriceLists,
  accessoryPriceLists,
  hatPriceLists,
}: {
  user: User
  gender: Gender
  topPriceLists: PriceLists
  bottomPriceLists: PriceLists
  dressPriceLists: PriceLists
  shoesPriceLists: PriceLists
  bagPriceLists: PriceLists
  accessoryPriceLists: PriceLists
  hatPriceLists: PriceLists
}) {
  return (
    <div>
      {user === 'D'
        ? (
          <DemandStep5
            gender={gender}
            topPriceLists={topPriceLists}
            bottomPriceLists={bottomPriceLists}
            dressPriceLists={dressPriceLists}
            shoesPriceLists={shoesPriceLists}
            bagPriceLists={bagPriceLists}
            accessoryPriceLists={accessoryPriceLists}
            hatPriceLists={hatPriceLists}
          />
        ) : <SupplyStep5 />}
    </div>
  )
}
