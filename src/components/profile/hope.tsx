import { useAuth } from 'providers/auth'
import TextareaField from './textarea-field'

export default function Hope() {
  const { user } = useAuth()
  const { hopeToSupplier } = user

  return (
    <TextareaField
      head="스타일리스트에게 바라는 점"
      name="hopeToSupplier"
      content={hopeToSupplier}
      maxLength={500}
    />
  )
}
