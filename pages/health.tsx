import AppBar from 'components/app-bar'
import Layout from 'layouts/default'
import ErrorContainer from 'templates/error-container'

export default function Page() {
  return (
    <Layout
      header={<AppBar back />}
    >
      <ErrorContainer>
        Good
      </ErrorContainer>
    </Layout>
  )
}
