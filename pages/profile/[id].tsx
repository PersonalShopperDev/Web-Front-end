import Layout from 'layouts/default'
import { GetServerSideProps } from 'next'
import { communicateWithContext } from 'lib/api'
import { ACCESS_TOKEN, useAuth, User } from 'providers/auth'
import parseJwt from 'lib/util/jwt'
import ProfileProvider from 'providers/profile'
import Profile from 'templates/profile'
import AppBar from 'components/app-bar'
import { LookBookData } from 'templates/profile/look-book'
import ProfileChatButton from 'components/profile/chat-button'
import OnboardingProvider from 'providers/onboarding'

interface Props {
  userId: number
  user: User
  lookbookData : LookBookData
}

export default function Page({ userId, user, lookbookData } : Props) {
  const { user: myUser } = useAuth()

  return (
    <OnboardingProvider userId={userId}>
      <Layout
        header={<AppBar title="프로필" back />}
        bottom={(myUser.userId !== userId) && (
          <ProfileChatButton userId={userId} />
        )}
      >
        <ProfileProvider
          editable={false}
          user={{
            ...user,
            userId,
          }}
        >
          <Profile userId={userId} lookbookData={lookbookData} />
        </ProfileProvider>
      </Layout>
    </OnboardingProvider>
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

  const { userType } = parseJwt(token)

  if (userType === 'N') {
    return {
      redirect: {
        destination: '/onboard',
        permanent: false,
      },
    }
  }

  const { id } = context.params

  const [profileResponse, lookbookResponse] = await Promise.all([
    communicateWithContext({
      context,
      url: `/profile/${id}`,
    }),
    communicateWithContext({
      context,
      url: `/profile/${id}/lookbook`,
    })])

  if (profileResponse.status !== 200 || lookbookResponse.status !== 200) {
    throw new Error()
  }

  const [profileData, lookbookData] = await Promise.all([
    profileResponse.json(), lookbookResponse.json(),
  ])

  return {
    props: {
      userId: id,
      user: profileData,
      lookbookData,
    },
  }
}
