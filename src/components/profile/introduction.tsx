import { useAuth } from 'providers/auth'
import TextareaField from './textarea-field'

interface IntroductionData {
    introduction: string
}

export default function Introduction({ data } : { data: IntroductionData}) {
  const { user } = useAuth()
  const { introduction } = user || data || {}

  return <TextareaField head="자기소개" name="introduction" content={introduction} maxLength={100} />
}
