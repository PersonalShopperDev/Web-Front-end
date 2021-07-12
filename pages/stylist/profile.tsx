import Layout from 'layouts/default'
import Profile from 'templates/stylist/profile'
import StylistProfileAppBar from 'src/components/app-bar/stylist-profile'
import { useRouter } from 'next/router'
import LookBookProvider from 'providers/look-book'
import InfinityScrollProvider from 'providers/infinity-scroll'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN } from 'providers/auth'

export default function Page() {
  const router = useRouter()
  return (
    <Layout
      header={<StylistProfileAppBar />}
    >
      <InfinityScrollProvider>
        <LookBookProvider>
          <Profile id={Number(router.query.id)} />
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
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
