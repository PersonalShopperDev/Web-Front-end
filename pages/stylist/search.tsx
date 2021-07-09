import Layout from 'layouts/default'
import Search from 'templates/stylist/search'
import StylistSearchAppBar from 'src/components/app-bar/stylist-search'
import OnboardingProvider from 'providers/onboarding'

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
