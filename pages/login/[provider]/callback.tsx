import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import Layout from 'layouts/default'
import { useAuth } from 'providers/auth'
import { processToken as processNaverToken } from 'providers/auth/naver'
import { GetServerSideProps } from 'next'
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
      <></>
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

  return {
    props: {},
  }
}
