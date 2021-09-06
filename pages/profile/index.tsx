import Layout from 'layouts/default'
import { GetServerSideProps } from 'next'
import { communicateWithContext } from 'lib/api'
import { ACCESS_TOKEN, useAuth } from 'providers/auth'
import parseJwt from 'lib/util/jwt'
import Navigation from 'components/navigation'
import OnboardingProvider from 'providers/onboarding'
import { LookBookData } from 'templates/profile/look-book'
import ProfileProvider from 'providers/profile'
import Profile from 'templates/profile'

interface Props {
  userId: string
  lookbookData : LookBookData
}

export default function Page({ userId, lookbookData } : Props) {
  const { user } = useAuth()
  return (
    <OnboardingProvider>
      <Layout
        bottom={<Navigation />}
      >
        <ProfileProvider editable user={user}>
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
