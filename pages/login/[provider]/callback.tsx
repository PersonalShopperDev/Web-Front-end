import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import Layout from 'layouts/default'
import { useAuth } from 'providers/authProvider'
import { processToken as processNaverToken } from 'providers/authProvider/naverAuthProvider'
import { GetServerSideProps } from 'next'
import getServerSideAuth from 'lib/server/auth'
import providers from 'lib/config/provider'

export default function Page() {
  const router = useRouter()
  const { authenticate } = useAuth()

  const getToken = (): string => {
    switch (router.query.provider) {
      case 'naver':
        return processNaverToken(router)
      default:
        return null
    }
  }

  useEffect(() => {
    const { provider } = router.query
    if (!provider) {
      return
    }
    const token = getToken()
    if (!token) {
      router.push('/')
    }
    authenticate(provider as string, token)
  }, [router])

  return (
    <Layout>
      <p>processing ...</p>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { provider } = context.params
  if (!providers.includes(provider as string)) {
    return {
      notFound: true,
    }
  }

  const { authenticated } = await getServerSideAuth(context)
  if (authenticated) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}
