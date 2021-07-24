import Layout from 'layouts/default'
import Profile from 'templates/stylist/profile'
import StylistProfileAppBar from 'src/components/app-bar/stylist-profile'
import LookBookProvider from 'providers/look-book'
import InfinityScrollProvider from 'providers/infinity-scroll'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN } from 'providers/auth'

export default function Page({ id } : { id : string}) {
  return (
    <Layout
      header={<StylistProfileAppBar />}
    >
      <InfinityScrollProvider>
        <LookBookProvider>
          <Profile id={parseInt(id, 10)} />
        </LookBookProvider>
      </InfinityScrollProvider>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies[ACCESS_TOKEN]
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const { id } = context.params

  return {
    props: {
      id,
    },
  }
}
