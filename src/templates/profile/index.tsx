import ProfileTabBar from 'components/profile/tab-bar'
import { useProfile } from 'providers/profile'
import styles from 'sass/templates/profile/index.module.scss'
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
  userId : number,
  lookbookData: LookBookData
}) {
  const { userType } = useProfile().user
  return (
    <section className={styles.container}>
      <ProfileHeader />
      <ProfileTabBar
        tabLabels={
          userType === 'D'
            ? ['프로필', '스타일', '옷장']
            : ['프로필', '코디룩북', '리뷰']
        }
      >
        {userType === 'D'
          ? [
            <ProfileInner key="0" />,
            <ProfileStyle key="1" />,
            <ProfileWardrobe key="2" />,
          ]
          : [
            <ProfileStylistInner key="0" />,
            <ProfileLookBook key="1" userId={userId} data={lookbookData} />,
            <ProfileReview key="2" userId={userId} />,
          ]}
      </ProfileTabBar>
    </section>
  )
}
