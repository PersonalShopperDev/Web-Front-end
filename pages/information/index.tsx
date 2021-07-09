import Layout from 'layouts/default'
import InformationAppBar from 'components/app-bar/information'
import Information from 'templates/information/index'
import OnboardingProvider from 'providers/onboarding'

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
