import Layout from 'layouts/default'
import StyleChange from 'templates/information/style-change'
import OnboardingProvider from 'providers/onboarding'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN, useAuth, UserType } from 'providers/auth'
import StyleLists from 'templates/information/style-list'
import StyleListAppBar from 'components/app-bar/style-list'
import parseJwt from 'lib/util/jwt'

interface Props {
  data: Data
}

interface Data {
  userType: UserType
}

export default function Page({ data } : Props) {
  const { user } = useAuth()
  const { userType } = user || data

  return (
    <Layout
      header={userType !== 'D' && <StyleListAppBar />}
    >
      <OnboardingProvider>
        {userType === 'D'
          ? <StyleChange /> : <StyleLists /> }
      </OnboardingProvider>
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
  const { userType } = parseJwt(token)
  return {
    props: {
      data: {
        userType,
      },
    },
  }
}
