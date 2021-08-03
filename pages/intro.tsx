import IntroAppBar from 'components/app-bar/intro'
import Layout from 'layouts/default'
import Intro from 'templates/intro'

export default function Page() {
  return (
    <Layout
      header={<IntroAppBar />}
    >
      <Intro />
    </Layout>
  )
}
