import ProfileTabBar from 'components/profile/tab-bar'
import { useProfile } from 'providers/profile'
import ProfileHeader from './header'
import ProfileInner from './inner'
import ProfileLookBook, { LookBookData } from './look-book'
import ProfileReview from './review'
import ProfileStyle from './style'
import ProfileStylistInner from './stylist-inner'
import ProfileWardrobe from './wardrobe'

export default function Profile({
  userId,
  lookbookData,
} : {
  userId : string,
  lookbookData: LookBookData
}) {
  const { userType } = useProfile().user

  return (
    <>
      <ProfileHeader />
      <ProfileTabBar
        tabLabels={
          userType === 'D'
            ? ['프로필', '스타일', '옷장']
            : ['프로필', '코디룩북', '리뷰']
        }
      >
        {userType === 'D'
          ? [<ProfileInner />, <ProfileStyle />, <ProfileWardrobe />]
          : [
            <ProfileStylistInner />,
            <ProfileLookBook userId={userId} data={lookbookData} />,
            <ProfileReview userId={parseInt(userId, 10)} />,
          ]}
      </ProfileTabBar>
    </>
  )
}
