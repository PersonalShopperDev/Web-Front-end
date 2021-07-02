import Layout from 'layouts/default'
import InformationAppBar from 'components/app-bar/information'
import Information from 'templates/information/index'

export default function Page() {
  return (
    <Layout
      header={<InformationAppBar />}
    >
      <Information />
    </Layout>
  )
}
