import { useAuth } from 'providers/auth'
import InputField from './input-field'

interface NameData {
  name: string
}

export default function Name({ data } : { data: NameData}) {
  const { user } = useAuth()

  const { name } = user || data || {}

  return <InputField head="이름" name="name" content={name} />
}
