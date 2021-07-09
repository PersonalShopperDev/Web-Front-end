import Layout from 'layouts/default'
import StyleChange from 'templates/information/style-change'
import OnboardingProvider from 'providers/onboarding'

export default function Page() {
  return (
    <Layout>
      <OnboardingProvider>
        <StyleChange />
      </OnboardingProvider>
    </Layout>
  )
}
