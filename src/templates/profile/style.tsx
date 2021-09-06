import Style from 'components/profile/style'
import BodyForm from 'components/profile/body-form'
import SkinTone from 'components/profile/skin-tone'
import ClothSize from 'components/profile/cloth-size'
import PriceRange from 'components/profile/price-range'
import Divider from 'widgets/divider'
import ProfileHeader from 'components/profile/header'
import HeightWeight from 'components/profile/height-weight'
import { useProfile } from 'providers/profile'

export default function ProfileStyle() {
  const { user } = useProfile()

  return (
    <>
      <ProfileHeader title="선호 스타일" type="styleText">
        <Style />
      </ProfileHeader>
      <Divider />
      <ProfileHeader title="체형 종류" type="body">
        <BodyForm />
      </ProfileHeader>
      <Divider />
      {user.gender === 'F'
      && (
      <ProfileHeader title="피부톤" type="skin">
        <SkinTone />
      </ProfileHeader>
      ) }
      <Divider />
      <HeightWeight />
      <Divider />
      <ProfileHeader title="옷 사이즈" type="size">
        <ClothSize />
      </ProfileHeader>
      <Divider />
      <ProfileHeader title="원하는 가격대" type="price">
        <PriceRange />
      </ProfileHeader>
    </>
  )
}
