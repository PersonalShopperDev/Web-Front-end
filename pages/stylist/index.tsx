import Layout from 'layouts/default'
import List from 'templates/stylist/list'
// import Navigation from 'src/components/navigation'
import StylistListAppBar from 'src/components/app-bar/stylist-list'
import IntegratedInfinityScrollProvider from 'providers/infinity-scroll/integrated'

export default function Page() {
  return (
    <Layout
      header={<StylistListAppBar />}
      // bottom={<Navigation />}
    >
      <IntegratedInfinityScrollProvider>
        <List />
      </IntegratedInfinityScrollProvider>
    </Layout>
  )
}
