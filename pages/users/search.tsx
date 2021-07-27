import Layout from 'layouts/default'
import Search from 'templates/users/search'
import StylistSearchAppBar from 'src/components/app-bar/stylist-search'
import OnboardingProvider from 'providers/onboarding'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN } from 'providers/auth'
import parseJwt from 'lib/util/jwt'

export default function Page() {
  return (
    <Layout
      header={<StylistSearchAppBar />}
    >
      <OnboardingProvider>
        <Search />
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
