import Layout from 'layouts/default'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN } from 'providers/auth'
import parseJwt from 'lib/util/jwt'
import Pay from 'templates/pay'
import AppBar from 'components/app-bar'

export default function Page() {
  return (
    <Layout header={<AppBar title="결제" back />}>
      <Pay />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies[ACCESS_TOKEN]
  if (!token) {
    return {
      notFound: true,
    }
  }

  const { userType } = parseJwt(token)

  if (userType !== 'D') {
    return {
      notFound: true,
    }
  }

  return {
    props: {},
  }
}
