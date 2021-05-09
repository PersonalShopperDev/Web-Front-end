import Navigation from 'components/navigation'
import Layout from 'layouts/default'
import dynamic from 'next/dynamic'

export default function Home() {
  const Landing = dynamic(() => import('templates/landing'))

  return (
    <Layout
      Header={<Navigation />}
    >
      <Landing />
    </Layout>
  )
}
