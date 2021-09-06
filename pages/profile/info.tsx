import Layout from 'layouts/default'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN, useAuth } from 'providers/auth'
import parseJwt from 'lib/util/jwt'
import AppBar from 'components/app-bar'
import ProfileInfo from 'templates/profile/info'
import ProfileProvider from 'providers/profile'

interface Props {
  userId: string
}

export default function Page({ userId } : Props) {
  const { user } = useAuth()

  return (
    <Layout
      header={<AppBar title="개인정보" back />}
    >
      <ProfileProvider editable user={user}>
        <ProfileInfo />
      </ProfileProvider>
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

  return {
    props: {
      userId,
    },
  }
}
