import { useAuth } from 'providers/auth'
import BaseStep from '../base'
import FirstStepForDemander from './demander'
import FirstStepForSupplier from './supplier'

export default function FirstStep() {
  const { userType } = useAuth().user

  return (
    <BaseStep
      title="STEP1. 입금 요청"
    >
      {userType === 'D'
        ? <FirstStepForDemander />
        : <FirstStepForSupplier />}
    </BaseStep>
  )
}
