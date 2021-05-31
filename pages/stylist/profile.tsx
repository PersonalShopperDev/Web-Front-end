import Layout from 'layouts/default'
import Profile from 'templates/stylist/profile'
import StylistProfileAppBar from 'src/components/app-bar/stylist-profile'
import { withRouter } from 'next/router'

const Page = ({ router: { query } }) => {
  const stylist = JSON.parse(query.stylist)
  return (
    <Layout
      header={<StylistProfileAppBar />}
    >
      <Profile info={stylist} />
    </Layout>
  )
}
export default withRouter(Page)
