import Layout from 'layouts/default'
import UserListAppBar from 'components/app-bar/user-list'
import List from 'templates/users/list'
import Navigation from 'src/components/navigation'
import InfinityScrollProvider from 'providers/infinity-scroll'
import UserListProvider from 'providers/user-list'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN } from 'providers/auth'
import parseJwt from 'lib/util/jwt'

export default function Page() {
  return (
    <UserListProvider>
      <Layout
        header={<UserListAppBar userType="D" />}
        bottom={<Navigation />}
      >
        <InfinityScrollProvider>
          <List userType="D" />
        </InfinityScrollProvider>
      </Layout>
    </UserListProvider>
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

  if (userType === 'N') {
    return {
      redirect: {
        destination: '/onboard',
        permanent: false,
      },
    }
  }

  return {
    props: {
    },
  }
}
