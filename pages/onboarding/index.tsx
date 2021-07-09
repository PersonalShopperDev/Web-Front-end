import Layout from 'layouts/default'
import Onboarding from 'templates/onboarding/index'
import OnboardingProvider from 'providers/onboarding'

export default function Page() {
  return (
    <Layout>
      <OnboardingProvider>
        <Onboarding />
      </OnboardingProvider>
    </Layout>
  )
}
