import Layout from 'layouts/default'
import { GetServerSideProps } from 'next'
import parseJwt from 'lib/util/jwt'
import { ACCESS_TOKEN } from 'providers/auth'
import ProposeForm from 'templates/propose/form'
import AppBar from 'components/app-bar'

export default function Page() {
  return (
    <Layout header={<AppBar title="견적서" back />}>
      <ProposeForm />
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

  const { userType } = parseJwt(token)
  return {
    props: {},
  }
  if (userType === 'S') {
    return {
      props: {},
    }
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }
}
