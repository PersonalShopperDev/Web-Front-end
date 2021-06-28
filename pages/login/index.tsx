import Layout from 'layouts/default'
import { GetServerSideProps } from 'next'
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
  const { accessToken } = context.req.cookies

  if (accessToken) {
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
