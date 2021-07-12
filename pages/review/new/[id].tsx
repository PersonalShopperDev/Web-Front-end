import Layout from 'layouts/default'
import ReviewEditor from 'templates/review-editor'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN } from 'providers/auth'
import SubProfileAppBar from 'components/app-bar/sub-profile'

export default function Page({ data } : any) {
  return (
    <Layout
      header={<SubProfileAppBar title="리뷰 작성" />}
    >
      <ReviewEditor />
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

  // const { id } = context.params

  // const res = await communicateWithContext({
  //   context,
  //   url: `/profile/${id}/coord`,
  // })

  // console.log(res)

  // if (res.status !== 200) {
  //   return {
  //     redirect: {
  //       destination: '/500',
  //       permanent: false,
  //     },
  //   }
  // }

  // const data = await res.json()

  return {
    props: {
      // data,
    },
  }
}
