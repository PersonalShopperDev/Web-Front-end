import AvatarInput from 'components/profile/avatar-input'
import InputField from 'components/profile/input-field'
import TextareaField from 'components/profile/textarea-field'
import Wardrobe from 'components/profile/wardrobe'
import HeightWeight from 'components/profile/height-weight'
import Divider from 'widgets/divider'
import Review from 'components/profile/review'

export default function Profile() {
  return (
    <>
      <AvatarInput
        src="/images/sample-avatar.jpg"
        name="오진수"
      />
      <InputField
        head="이름"
        content="오진수"
      />
      <Divider />
      <TextareaField
        head="자기소개"
      />
      <Divider />
      <Wardrobe />
      <Divider />
      <HeightWeight />
      <Divider />
      <TextareaField
        head="스타일리스트에게 바라는 점"
      />
      <Review />
    </>
  )
}
