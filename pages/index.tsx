import Layout from 'layouts/default'
import LoginBanner from 'components/login-banner'
import Banner, { BannerData } from 'components/banner'
import BeforeAfter, { BeforeAfterData } from 'components/before-after'
import StylistGridView, { StylistGridViewData } from 'components/stylist-grid-view'
import StylistHomeAppBar from 'components/app-bar/stylist-home'
import { GetServerSideProps } from 'next'
import { communicateWithContext } from 'lib/api'
import parseJwt from 'lib/util/jwt'
import { ACCESS_TOKEN } from 'providers/auth'

interface Props {
  needLogin: boolean,
  data: Data
}

interface Data {
  banners: BannerData[]
  suppliers: StylistGridViewData[]
  reviews: BeforeAfterData[]
}

export default function Page({ needLogin, data } : Props) {
  const { banners, suppliers, reviews } = data
  return (
    <Layout
      header={(
        <StylistHomeAppBar />
      )}
    >
      { needLogin ? <LoginBanner /> : <Banner data={banners} />}
      <BeforeAfter data={reviews} />
      <StylistGridView data={suppliers} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const res = await communicateWithContext({
    url: '/home',
    context,
  })

  if (res.status !== 200) {
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    }
  }

  const data = await res.json()

  const token = context.req.cookies[ACCESS_TOKEN]

  if (!token) {
    return {
      props: {
        needLogin: true,
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
      needLogin: false,
      data,
    },
  }
}
