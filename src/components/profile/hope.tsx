import { useAuth } from 'providers/auth'
import TextareaField from './textarea-field'

interface HopeData {
  hopeToSupplier: string
}

export default function Hope({ data }: { data: HopeData}) {
  const { user } = useAuth()
  const { hopeToSupplier } = user || data || {}

  return (
    <TextareaField
      head="스타일리스트에게 바라는 점"
      name="hopeToSupplier"
      content={hopeToSupplier}
      maxLength={500}
    />
  )
}
