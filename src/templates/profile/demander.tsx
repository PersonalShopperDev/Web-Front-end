import PreviewSlide from 'components/profile-preview/slide'
import PreviewName from 'components/profile-preview/name'
import TagList from 'components/profile-preview/tag-list'
import Description from 'components/profile-preview/description'
import Divider from 'widgets/divider'
import StyleInfo from 'components/profile-preview/style-info'
import { useAuth, User } from 'providers/auth'
import Propose from 'components/profile-preview/propose'

export default function DemanderProfile({ id, data } : { id: string, data: User }) {
  const {
    closet, styles, name, introduction, hopeToSupplier, bodyStat,
  } = data

  const { user } = useAuth()

  const isFromSupplierToDemander = () => user.userType !== 'D' && data.userType === 'D'

  return (
    <>
      <PreviewSlide data={closet} />
      <PreviewName name={name} />
      <TagList data={styles} />
      <Description head="자기소개" content={introduction} />
      <Divider />
      <Description head="스타일리스트에게 바라는 점" content={hopeToSupplier} />
      <Divider />
      <StyleInfo data={bodyStat} />
      {isFromSupplierToDemander() && <Propose id={id} />}
    </>
  )
}
