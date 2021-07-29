import Layout from 'layouts/default'
import ReviewEditor from 'templates/review-editor'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN } from 'providers/auth'
import SubProfileAppBar from 'components/app-bar/sub-profile'
import Preview, { PreviewData } from 'components/review/preview'
import { communicateWithContext } from 'lib/api'

interface Props {
  id: number
  data: PreviewData
}

export default function Page({ id, data } : Props) {
  const { supplierId } = data

  return (
    <Layout
      header={<SubProfileAppBar title="리뷰 작성" />}
    >
      <Preview data={data} />
      <ReviewEditor id={id} supplier={supplierId} />
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

  const res = await communicateWithContext({
    context,
    url: `/review/${id}/coord`,
  })

  if (res.status !== 200) {
    if (context.res) {
      context.res.statusCode = res.status
    }
    throw new Error(`Api server responsed ${res.status} :: /profile/${id}/coord`)
  }

  const data = await res.json()

  return {
    props: {
      id,
      data,
    },
  }
}
