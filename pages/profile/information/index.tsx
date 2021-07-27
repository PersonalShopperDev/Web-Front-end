import Layout from 'layouts/default'
import Information from 'templates/information/index'
import OnboardingProvider from 'providers/onboarding'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN } from 'providers/auth'
import parseJwt from 'lib/util/jwt'
import DrawerAppBar from 'components/app-bar/drawer'

export default function Page() {
  return (
    <Layout
      header={<DrawerAppBar title="내정보" isLogined />}
    >
      <OnboardingProvider>
        <Information />
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

  if (userType === 'N') {
    return {
      redirect: {
        destination: '/onboard',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
