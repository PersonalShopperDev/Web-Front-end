import Layout from 'layouts/default'
import { useRouter } from 'next/dist/client/router'
import { useAuth } from 'providers/auth'
import { useEffect } from 'react'

export default function Page() {
  const router = useRouter()
  const { signOut } = useAuth()

  useEffect(() => {
    signOut()
    router.push('/')
  }, [])
  return (
    <Layout>
      <p>login failed</p>
    </Layout>
  )
}
