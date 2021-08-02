import { useAuth } from 'providers/auth'
import BaseStep from '../base'
import ThirdStepForDemander from './demander'
import ThirdStepForSupplier from './supplier'

export default function ThirdStep() {
  const { userType } = useAuth().user

  const title = userType === 'D' ? '코디 진행' : '입금 확정'
  return (
    <BaseStep
      title={`STEP3. ${title}`}
    >
      {userType === 'D'
        ? <ThirdStepForDemander />
        : <ThirdStepForSupplier />}
    </BaseStep>
  )
}
