import Layout from 'layouts/default'
import List from 'templates/stylist/list'
import Navigation from 'src/components/navigation'
import StylistListAppBar from 'src/components/app-bar/stylist-list'
import InfinityScrollProvider from 'providers/infinity-scroll'
import UserListProvider from 'providers/user-list'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN } from 'providers/auth'
import parseJwt from 'lib/util/jwt'

export default function Page() {
  return (
    <UserListProvider>
      <Layout
        header={<StylistListAppBar />}
        bottom={<Navigation />}
      >
        <InfinityScrollProvider>
          <List />
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
    props: {},
  }
}
