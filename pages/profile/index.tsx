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
import { GetServerSideProps } from 'next'
import { communicateWithContext } from 'lib/api'
import { ACCESS_TOKEN, User } from 'providers/auth'
import CodyStyle from 'components/profile/cody-style'

export default function Page({ data } : { data: User }) {
  const {
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
          <CodyStyle label="선호하는 스타일" data={{ styles }} />
          <Divider />
          <Price data={{ price }} />
          <Divider />
          <Represent data={{ coord }} />
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

  const res = await communicateWithContext({
    context,
    url: '/profile',
  })

  if (res.status !== 200) {
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    }
  }

  const data = await res.json()

  return {
    props: {
      data,
    },
  }
}
