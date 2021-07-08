import Layout from 'layouts/default'
import Search from 'templates/stylist/search'
import StylistSearchAppBar from 'src/components/app-bar/stylist-search'

export default function Page() {
  return (
    <Layout
      header={<StylistSearchAppBar />}
    >
      <Search />
    </Layout>
  )
}
