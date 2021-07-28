import Layout from 'layouts/default'
import SubProfileAppBar from 'components/app-bar/sub-profile'
import ScrapGridView from 'components/scrap-grid-view'

export default function Page() {
  return (
    <Layout
      header={(
        <SubProfileAppBar title="스크랩" />
      )}
    >
      <ScrapGridView />
    </Layout>
  )
}
