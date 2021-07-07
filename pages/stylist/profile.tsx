import Layout from 'layouts/default'
import Profile from 'templates/stylist/profile'
import StylistProfileAppBar from 'src/components/app-bar/stylist-profile'
import { withRouter } from 'next/router'

const Page = ({ router: { query } }) => (
  <Layout
    header={<StylistProfileAppBar />}
  >
    <Profile id={query.id} />
  </Layout>
)
export default withRouter(Page)
