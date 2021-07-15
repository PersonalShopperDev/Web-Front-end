import Layout from 'layouts/default'
import { GetServerSideProps } from 'next'
import parseJwt from 'lib/util/jwt'
import { ACCESS_TOKEN } from 'providers/auth'
import ChatBanner from 'components/chat/banner'
import ChatList from 'components/chat/list'
import HomeAppBar from 'components/app-bar/home'

export default function Page() {
  return (
    <Layout
      header={<HomeAppBar title="채팅" />}
    >
      <ChatBanner src="/images/sample-avatar.jpg" />
      <ChatList />
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
        destination: '/onboarding',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
