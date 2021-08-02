import Layout from 'layouts/default'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN } from 'providers/auth'
import IntegratedAuthProvider from 'providers/auth/integrated'
import Login from 'templates/login'

export default function Page() {
  return (
    <Layout>
      <IntegratedAuthProvider>
        <Login />
      </IntegratedAuthProvider>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies[ACCESS_TOKEN]

  if (token) {
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
