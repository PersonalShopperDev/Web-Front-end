import Layout from 'layouts/default'
import StyleChange from 'templates/information/style-change'
import OnboardingProvider from 'providers/onboarding'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN } from 'providers/auth'

export default function Page() {
  return (
    <Layout>
      <OnboardingProvider>
        <StyleChange />
      </OnboardingProvider>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies[ACCESS_TOKEN]

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
