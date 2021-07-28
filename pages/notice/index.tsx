import Layout from 'layouts/default'
import DrawaerAppBar from 'components/app-bar/drawer'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN } from 'providers/auth'
import Notice from 'templates/notice'
import InfinityScrollProvider from 'providers/infinity-scroll'
import NoticeProvider from 'providers/notice'

interface Props {
    isLogined: boolean,
}

export default function Page({ isLogined }: Props) {
  const title = '공지사항'
  return (
    <Layout
      header={(
        <DrawaerAppBar title={title} isLogined={isLogined} />
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
  const isLogined = token !== undefined
  return {
    props: {
      isLogined,
    },
  }
}
