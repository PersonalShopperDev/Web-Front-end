import React, {
  Dispatch,
  SetStateAction,
} from 'react'
import DemandStep3 from 'src/components/onboarding/demand-step3'
import SupplyStep3 from 'src/components/onboarding/supply-step3'
import { Gender, User } from '../index'

export default function Step3({
  user,
  nextStep,
  body,
  skin,
  gender,
  setBody,
  setSkin,
  codyLists,
  setCodyLists,
}: {
  user: User
  nextStep: boolean,
  body: number,
  skin: number,
  gender: Gender,
  setBody: (value: number) => void;
  setSkin: (value: number) => void;
  codyLists: Array<string>
  setCodyLists: Dispatch<SetStateAction<any>>

}) {
  return (
    <div>
      {user === 'D'
        ? (
          <DemandStep3
            nextStep={nextStep}
            body={body}
            setBody={setBody}
            skin={skin}
            setSkin={setSkin}
            gender={gender}
          />
        ) : (
          <SupplyStep3
            codyLists={codyLists}
            setCodyLists={setCodyLists}
          />
        )}
    </div>
  )
}
