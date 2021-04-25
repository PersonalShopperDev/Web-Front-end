import Layout from '../../../src/layouts/default'
import { useCallbackProcess } from '../../../src/providers/naverLoginProvider'

export default function Page() {
  useCallbackProcess()
  
  return (
    <Layout>
      <p>processing ...</p>
    </Layout>
  )
}
