import Layout from 'layouts/default'
import getServerSideAuth from 'lib/server/auth'
import { GetServerSideProps } from 'next'
import IntegratedAuthProvider from 'providers/authProvider/integratedAuthProvider'
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
  const { authenticated } = await getServerSideAuth(context)
  if (authenticated) {
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
