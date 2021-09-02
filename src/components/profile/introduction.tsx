import { useProfile } from 'providers/profile'
import TextareaField from './textarea-field'

export default function Introduction() {
  const { user } = useProfile()
  const { introduction } = user

  return (
    <TextareaField
      head="자기소개"
      name="introduction"
      content={introduction}
      maxLength={100}
      placeholder="나의 패션에 대해서 소개해 주세요:)"
    />
  )
}
