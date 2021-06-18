import LoginForm from 'components/loginForm'
import Layout from 'layouts/default'
import getServerSideAuth from 'lib/server/auth'
import { GetServerSideProps } from 'next'
import IntegratedAuthProvider from 'providers/authProvider/integratedAuthProvider'

export default function Page() {
  return (
    <Layout>
      <IntegratedAuthProvider>
        <LoginForm />
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
