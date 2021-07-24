import Layout from 'layouts/default'
import List from 'templates/users/list'
// import Navigation from 'src/components/navigation'
import UserListAppBar from 'components/app-bar/user-list'
import InfinityScrollProvider from 'providers/infinity-scroll'
import UserListProvider from 'providers/user-list'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN } from 'providers/auth'
import parseJwt from 'lib/util/jwt'

export default function Page({ userType }) {
  return (
    <UserListProvider>
      <Layout
        header={<UserListAppBar userType={userType} />}
      >
        <InfinityScrollProvider>
          <List userType={userType} />
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
        destination: '/',
        permanent: false,
      },
    }
  }
  const { userType } = parseJwt(token)

  return {
    props: {
      userType,
    },
  }
}
