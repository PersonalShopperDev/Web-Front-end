import Layout from 'layouts/default'
import ProfileAppBar from 'components/app-bar/profile'
import AvatarInput from 'components/profile/avatar-input'
import Name from 'components/profile/name'
import Career from 'components/profile/career'
import Introduction from 'components/profile/introduction'
import Price from 'components/profile/price'
import Hope from 'components/profile/hope'
import Wardrobe from 'components/profile/wardrobe'
import HeightWeight from 'components/profile/height-weight'
import Divider from 'widgets/divider'
import Review from 'components/profile/review'
import Represent from 'components/profile/represents'
import LookBook, { LookBookData } from 'components/profile/look-book'
import { GetServerSideProps } from 'next'
import { communicateWithContext } from 'lib/api'
import { ACCESS_TOKEN, User } from 'providers/auth'
import CodyStyle from 'components/profile/cody-style'
import parseJwt from 'lib/util/jwt'
import Navigation from 'components/navigation'

interface Props {
  userId: string
  data : User & { lookbook : LookBookData }
}

export default function Page({ userId, data } : Props) {
  const {
    lookbook,
    userType,
    careerList,
    styles,
    coord,
    price,
    name,
    img,
    introduction,
    closet,
    bodyStat,
    hopeToSupplier,
  } = data

  return (
    <Layout
      header={<ProfileAppBar />}
      bottom={<Navigation />}
    >
      <AvatarInput data={{ img, name }} />
      <Name data={{ name }} />
      <Divider />
      {userType === 'S' && (
        <>
          <Career data={{ careerList }} />
          <Divider />
        </>
      )}
      <Introduction data={{ introduction }} />
      <Divider />
      {userType === 'D' && (
        <>
          <Wardrobe data={{ closet }} />
          <Divider />
          <HeightWeight data={{ bodyStat }} />
          <Divider />
          <CodyStyle label="선호하는 스타일" data={{ styles }} />
          <Divider />
          <Hope data={{ hopeToSupplier }} />
          <Divider />
          <Review data={null} />
        </>
      )}
      {userType === 'S' && (
        <>
          <CodyStyle label="자신있는 코디 스타일" data={{ styles }} />
          <Divider />
          <Price data={{ price }} />
          <Divider />
          <Represent data={{ coord }} />
          <Divider />
          <LookBook data={lookbook} userId={userId} />
        </>
      )}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies[ACCESS_TOKEN]
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const { userType, userId } = parseJwt(token)

  if (userType === 'N') {
    return {
      redirect: {
        destination: '/onboard',
        permanent: false,
      },
    }
  }

  const [profileResponse, lookbookResponse] = await Promise.all([
    communicateWithContext({
      context,
      url: '/profile',
    }),
    communicateWithContext({
      context,
      url: `/profile/${userId}/lookbook`,
    }),
  ])

  if (profileResponse.status !== 200) {
    if (context.res) {
      context.res.statusCode = profileResponse.status
    }
    throw new Error(`Api server responsed ${profileResponse.status} :: /profile`)
  }

  if (lookbookResponse.status !== 200) {
    if (context.res) {
      context.res.statusCode = profileResponse.status
    }
    throw new Error(`Api server responsed ${lookbookResponse.status} :: /profile/${userId}/lookbook`)
  }

  const profileData = await profileResponse.json()
  const lookbookData = await lookbookResponse.json()

  return {
    props: {
      userId,
      data: {
        lookbook: lookbookData,
        ...profileData,
      },
    },
  }
}
