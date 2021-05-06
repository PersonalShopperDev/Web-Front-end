import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import Layout from '../../../src/layouts/default'
import { useAuth } from '../../../src/providers/authProvider'
import { processToken as processNaverToken } from '../../../src/providers/naverLoginProvider'

export default function Page() {
  const router = useRouter()
  const { authenticate } = useAuth()

  const getToken = () : string => {
    switch(router.query.provider) {
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
    authenticate(provider as string, getToken())
  }, [router])
  
  return <Layout>
    <p>processing ...</p>
  </Layout>
}
