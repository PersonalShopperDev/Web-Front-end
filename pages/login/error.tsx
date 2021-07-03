import Layout from 'layouts/default'
import { useAuth } from 'providers/auth'
import { useEffect } from 'react'

export default function Page() {
  const { signOut } = useAuth()

  useEffect(() => {
    signOut('/')
  }, [])

  return (
    <Layout>
      <p>login failed</p>
    </Layout>
  )
}
