import Layout from 'layouts/default'
import StylistHome from 'templates/stylist-home'
import StylistHomeAppBar from 'components/app-bar/stylist-home'

export default function Page() {
  return (
    <Layout
      header={(
        <StylistHomeAppBar />
      )}
    >
      <StylistHome />
    </Layout>
  )
}
