import { useProfile } from 'providers/profile'
import InputField from './input-field'

export default function Phonenumber() {
  const { user } = useProfile()
  const { phone } = user
  return (
    <InputField
      head="연락번호"
      name="phone"
      content={phone}
      placeholder="010-0000-0000"
    />
  )
}
