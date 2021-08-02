import Layout from 'layouts/default'
import { useAuth } from 'providers/auth'
import { useEffect } from 'react'
import ErrorContainer from 'templates/error-container'

export default function Page() {
  const { signOut } = useAuth()

  useEffect(() => {
    setTimeout(() => {
      signOut('/')
    }, 1000)
  }, [])

  return (
    <Layout>
      <ErrorContainer>
        Login failed
      </ErrorContainer>
    </Layout>
  )
}
