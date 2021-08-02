import Layout from 'layouts/default'
import DrawaerAppBar from 'components/app-bar/drawer'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN } from 'providers/auth'
import Notice from 'templates/notice'
import InfinityScrollProvider from 'providers/infinity-scroll'
import NoticeProvider from 'providers/notice'
import parseJwt from 'lib/util/jwt'

export default function Page() {
  const title = '공지사항'
  return (
    <Layout
      header={(
        <DrawaerAppBar title={title} isLogined />
      )}
    >
      <InfinityScrollProvider>
        <NoticeProvider>
          <Notice />
        </NoticeProvider>
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

  const { userType } = parseJwt(token)

  if (userType === 'N') {
    return {
      redirect: {
        destination: '/onboard',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
