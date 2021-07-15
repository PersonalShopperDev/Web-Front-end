import Layout from 'layouts/default'
import { BannerData } from 'components/banner'
import { BeforeAfterData } from 'components/before-after'
import { SupplierData, DemanderData } from 'components/stylist-grid-view'
import { GetServerSideProps } from 'next'
import parseJwt from 'lib/util/jwt'
import { ACCESS_TOKEN, UserType } from 'providers/auth'
import ChatBanner from 'components/chat/banner'
import ChatList from 'components/chat/list'

interface Props {
  data: Data
}

interface Data {
  userType: UserType
  banners: BannerData[]
  suppliers: SupplierData[]
  demanders: DemanderData[]
  reviews: BeforeAfterData[]
}

export default function Page({ data } : Props) {
  return (
    <Layout>
      <ChatBanner src="/images/sample-avatar.jpg" />
      <ChatList />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const token = context.req.cookies[ACCESS_TOKEN]

  // if (!token) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false,
  //     },
  //   }
  // }

  // const { userType } = parseJwt(token)

  // if (userType === 'N') {
  //   return {
  //     redirect: {
  //       destination: '/onboarding',
  //       permanent: false,
  //     },
  //   }
  // }

  return {
    props: {},
  }
}
