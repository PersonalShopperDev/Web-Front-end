import Layout from 'layouts/default'
import List from 'templates/stylist/list'
// import Navigation from 'src/components/navigation'
import StylistListAppBar from 'src/components/app-bar/stylist-list'
import InfinityScrollProvider from 'providers/infinity-scroll'
import UserListProvider from 'providers/user-list'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN } from 'providers/auth'

export default function Page() {
  return (
    <UserListProvider>
      <Layout
        header={<StylistListAppBar />}
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
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
