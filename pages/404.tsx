import AppBar from 'components/app-bar'
import Navigation from 'components/navigation'
import Layout from 'layouts/default'
import ErrorContainer from 'templates/error-container'

export default function Page() {
  return (
    <Layout
      header={<AppBar back />}
      bottom={<Navigation />}
    >
      <ErrorContainer>
        Page not found
      </ErrorContainer>
    </Layout>
  )
}
