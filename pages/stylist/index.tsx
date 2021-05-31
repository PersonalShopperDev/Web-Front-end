import Layout from 'layouts/default'
import StylistHomeAppBar from 'src/components/app-bar/stylist-home'

export default function Page() {
  return (
    <Layout
      header={<StylistHomeAppBar />}
    >
      <h1>Home here</h1>
    </Layout>
  )
}
