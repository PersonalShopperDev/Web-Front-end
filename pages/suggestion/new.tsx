import Layout from 'layouts/default'
import CodySuggestionAppBar from 'components/app-bar/cody-suggestion'
import CodySuggetsion from 'templates/cody-suggestion'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN } from 'providers/auth'
import parseJwt from 'lib/util/jwt'

export default function Page({ uid } : { uid: string}) {
  return (
    <Layout
      header={<CodySuggestionAppBar />}
    >
      <CodySuggetsion id={uid} />
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

  if (userType === 'D') {
    return {
      notFound: true,
    }
  }

  const { uid } = context.query
  return {
    props: {
      uid,
    },
  }
}
