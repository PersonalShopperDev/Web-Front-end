import Hope from 'components/profile/hope'
import Introduction from 'components/profile/introduction'
import Phonenumber from 'components/profile/phonenumber'
import Divider from 'widgets/divider'

export default function ProfileInner() {
  return (
    <>
      <Introduction />
      <Divider />
      <Hope />
      <Divider />
      <Phonenumber />
    </>
  )
}
