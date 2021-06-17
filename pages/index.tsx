import Layout from 'layouts/default'
import LoginBanner from 'components/login-banner'
import Banner, { BannerData } from 'components/banner'
import BeforeAfter, { BeforeAfterData } from 'components/before-after'
import StylistGridView, { StylistGridViewData } from 'components/stylist-grid-view'
import StylistHomeAppBar from 'components/app-bar/stylist-home'
import { GetServerSideProps } from 'next'
import { communicateWithContext } from 'lib/api'

interface Props {
  needLogin: boolean,
  data: Data
}

interface Data {
  banners: BannerData[]
  stylists: StylistGridViewData[]
  reviews: BeforeAfterData[]
}

export default function Page({ needLogin, data } : Props) {
  const { banners, stylists, reviews } = data
  return (
    <Layout
      header={(
        <StylistHomeAppBar />
      )}
    >
      { needLogin ? <LoginBanner /> : <Banner data={banners} />}
      <BeforeAfter data={reviews} />
      <StylistGridView data={stylists} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const [authResponse, dataResponse] = await Promise.all([
    communicateWithContext({
      url: '/auth/test',
      context,
    }),
    communicateWithContext({
      url: '/home',
      context,
    }),
  ])

  if (!dataResponse.ok) {
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    }
  }

  const data = await dataResponse.json()

  if (!authResponse.ok) {
    return {
      props: {
        needLogin: true,
        data,
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
