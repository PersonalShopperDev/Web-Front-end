import Layout from 'layouts/default'
import List from 'templates/stylist/list'
// import Navigation from 'src/components/navigation'
import StylistListAppBar from 'src/components/app-bar/stylist-list'
import InfinityScrollProvider from 'providers/infinity-scroll'
import UserListProvider from 'providers/user-list'

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
