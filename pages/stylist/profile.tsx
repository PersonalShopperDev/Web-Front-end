import Layout from 'layouts/default'
import Profile from 'templates/stylist/profile'
import StylistProfileAppBar from 'src/components/app-bar/stylist-profile'
import { withRouter } from 'next/router'
import IntegratedInfinityScrollProvider from 'providers/infinity-scroll/integrated'

const Page = ({ router: { query } }) => (
  <Layout
    header={<StylistProfileAppBar />}
  >
    <IntegratedInfinityScrollProvider>
      <Profile id={query.id} />
    </IntegratedInfinityScrollProvider>
  </Layout>
)
export default withRouter(Page)
