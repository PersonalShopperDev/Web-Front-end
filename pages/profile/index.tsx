import Layout from 'layouts/default'
import Profile from 'templates/profile'
import ProfileAppBar from 'components/app-bar/profile'

export default function Page() {
  return (
    <Layout
      header={<ProfileAppBar />}
    >
      <Profile />
    </Layout>
  )
}
