import AvatarInput from 'components/profile/avatar-input'
import InputField from 'components/profile/input-field'
import TextareaField from 'components/profile/textarea-field'
import CodyStyle from 'components/profile/cody-style'
import Price from 'components/profile/price'
import Divider from 'widgets/divider'
import Career from 'components/profile/career'
import Represents from 'components/profile/represents'
import LookBook from 'components/profile/look-book'

export default function SupplierProfile() {
  return (
    <>
      <AvatarInput
        src="/images/sample-avatar.jpg"
        name="오진수"
      />
      <InputField
        head="스타일리스트 활동 이름"
        name="name"
        content="오진수"
      />
      <Divider />
      <Career />
      <Divider />
      <TextareaField
        head="자기소개"
        name="introduction"
        maxLength={100}
      />
      <Divider />
      <CodyStyle />
      <Divider />
      <Price />
      <Divider />
      <Represents />
      <Divider />
      <LookBook />
    </>
  )
}
