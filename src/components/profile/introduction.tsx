import { useAuth } from 'providers/auth'
import TextareaField from './textarea-field'

export default function Introduction() {
  const { user } = useAuth()
  const { introduction } = user

  return <TextareaField head="자기소개" name="introduction" content={introduction} maxLength={100} />
}
