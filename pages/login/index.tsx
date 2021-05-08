import LoginForm from 'components/loginForm'
import Layout from 'layouts/default'
import NaverLoginProvider from 'providers/naverLoginProvider'

export default function Page() {
  return (
    <Layout>
      <NaverLoginProvider>
        <LoginForm />
      </NaverLoginProvider>
    </Layout>
  )
}
