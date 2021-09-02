import { useProfile } from 'providers/profile'
import TextareaField from './textarea-field'

export default function Hope() {
  const { user } = useProfile()
  const { hopeToSupplier } = user

  return (
    <TextareaField
      head="스타일리스트에게 바라는 점"
      name="hopeToSupplier"
      content={hopeToSupplier}
      maxLength={500}
      placeholder="스타일리스트에게 원하는 바를 적어주세요."
    />
  )
}
