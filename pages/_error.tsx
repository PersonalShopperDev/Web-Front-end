import AppBar from 'components/app-bar'
import Navigation from 'components/navigation'
import Layout from 'layouts/default'
import { NextPageContext } from 'next'
import ErrorContainer from 'templates/error-container'

export default function Error({ statusCode } : { statusCode: number}) {
  const getContent = () => {
    if (statusCode) {
      return `An error ${statusCode} occurred on server`
    }
    return 'An error occurred on client'
  }

  return (
    <Layout
      header={<AppBar back />}
      bottom={<Navigation />}
    >
      <ErrorContainer>
        {getContent()}
      </ErrorContainer>
    </Layout>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const getStatusCode = () => {
    if (res) {
      return res.statusCode
    }
    if (err) {
      return err.statusCode
    }
    return 404
  }
  const statusCode = getStatusCode()
  return { statusCode }
}
