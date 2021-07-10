import Layout from 'layouts/default'
import LoginBanner from 'components/login-banner'
import Banner, { BannerData } from 'components/banner'
import BeforeAfter, { BeforeAfterData } from 'components/before-after'
import StylistGridView, { SupplierData, DemanderData } from 'components/stylist-grid-view'
import StylistHomeAppBar from 'components/app-bar/stylist-home'
import { GetServerSideProps } from 'next'
import { communicateWithContext } from 'lib/api'
import parseJwt from 'lib/util/jwt'
import { ACCESS_TOKEN, useAuth, UserType } from 'providers/auth'

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
  const { user } = useAuth()
  const { userType } = user || data
  const {
    banners, suppliers, demanders, reviews,
  } = data

  return (
    <Layout
      header={(
        <StylistHomeAppBar />
      )}
    >
      { !userType ? <LoginBanner /> : <Banner data={banners} />}
      <BeforeAfter data={reviews} />
      <StylistGridView suppliers={suppliers} demanders={userType !== 'D' && demanders} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await communicateWithContext({
    url: '/home',
    context,
  })

  if (res.status !== 200) {
    if (context.res) {
      context.res.statusCode = res.status
    }
    throw new Error()
  }

  const data = await res.json()

  const token = context.req.cookies[ACCESS_TOKEN]

  if (!token) {
    return {
      props: {
        data,
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
    props: {
      data: {
        userType,
        ...data,
      },
    },
  }
}
