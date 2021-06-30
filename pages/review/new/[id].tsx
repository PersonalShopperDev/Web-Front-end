import Layout from 'layouts/default'
import StylistHomeAppBar from 'components/app-bar/stylist-home'
import ReviewEditor from 'templates/review-editor'

export default function Page() {
  return (
    <Layout
      header={(
        <StylistHomeAppBar /> // to do after pull
      )}
    >
      <ReviewEditor />
    </Layout>
  )
}
