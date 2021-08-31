import Layout from 'layouts/default'
import { GetServerSideProps } from 'next'
import { communicateWithContext } from 'lib/api'
import { ACCESS_TOKEN } from 'providers/auth'
import parseJwt from 'lib/util/jwt'
import Navigation from 'components/navigation'
import ProfileHeader from 'templates/profile/header'
import ProfileTabBar from 'components/profile/tab-bar'
import ProfileInner from 'templates/profile/inner'
import ProfileStyle from 'templates/profile/style'
import ProfileWardrobe from 'templates/profile/wardrobe'

interface Props {
  userId: string
}

export default function Page({ userId } : Props) {
  return (
    <Layout
      bottom={<Navigation />}
    >
      <ProfileHeader />
      <ProfileTabBar
        tabLabels={['프로필', '스타일', '옷장']}
      >
        {[
          <ProfileInner />,
          <ProfileStyle />,
          <ProfileWardrobe />,
        ]}
      </ProfileTabBar>
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

  const lookbookResponse = await communicateWithContext({
    context,
    url: `/profile/${userId}/lookbook`,
  })

  if (lookbookResponse.status !== 200) {
    throw new Error(`Api server responsed ${lookbookResponse.status} :: /profile/${userId}/lookbook`)
  }
  const lookbookData = await lookbookResponse.json()

  return {
    props: {
      userId,
      lookbookData,
    },
  }
}
