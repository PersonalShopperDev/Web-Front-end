import Layout from 'layouts/default'
import InformationAppBar from 'components/app-bar/information'
import Information from 'templates/information/index'
import OnboardingProvider from 'providers/onboarding'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN } from 'providers/auth'

export default function Page() {
  return (
    <Layout
      header={<InformationAppBar />}
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

  return {
    props: {},
  }
}
