import Layout from 'layouts/default'
import SupplierProfile from 'templates/profile/supplier'
import LookBookProvider from 'providers/look-book'
import InfinityScrollProvider from 'providers/infinity-scroll'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN, User } from 'providers/auth'
import { communicateWithContext } from 'lib/api'
import DemanderProfile from 'templates/profile/demander'
import ProfilePreviewAppBar from 'components/app-bar/profile-preview'
import parseJwt from 'lib/util/jwt'
import ReviewProvider from 'providers/review'

export default function Page({
  id, data: other, reviewId,
} : { id: string; data: User, reviewId: string }) {
  return (
    <Layout
      header={<ProfilePreviewAppBar />}
    >
      <Inner id={id} data={other} reviewId={reviewId} />
    </Layout>
  )
}

function Inner({ id, data, reviewId }: { id: string; data: User, reviewId: string }) {
  const { userType } = data
  if (userType === 'N') {
    return <></>
  }
  if (userType === 'D') {
    return <DemanderProfile id={id} data={data} />
  }

  return (
    <InfinityScrollProvider>
      <LookBookProvider>
        <ReviewProvider>
          <SupplierProfile id={parseInt(id, 10)} data={data} reviewId={parseInt(reviewId, 10)} />
        </ReviewProvider>
      </LookBookProvider>
    </InfinityScrollProvider>
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

  const { id, reviewId } = context.query

  const res = await communicateWithContext({ url: `/profile/${id}`, context })

  if (res.status !== 200) {
    throw new Error()
  }

  const data = await res.json()

  return {
    props: {
      id,
      data,
      reviewId: reviewId || null,
    },
  }
}
