import Layout from 'layouts/default'
import SubProfileAppBar from 'components/app-bar/sub-profile'
import PurchaseListView from 'components/purchase-list-view'

export default function Page() {
  return (
    <Layout
      header={(
        <SubProfileAppBar title="결제내역" />
      )}
    >
      <PurchaseListView />
    </Layout>
  )
}
