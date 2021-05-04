import Layout from 'layouts/default'
import { useCallbackProcess } from 'providers/naverLoginProvider'

export default function Page() {
  useCallbackProcess()
  return (
    <Layout>
      <p>processing ...</p>
    </Layout>
  )
}
