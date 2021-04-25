import LoginForm from '../../src/components/loginForm'
import Layout from '../../src/layouts/default'
import NaverLoginProvider from '../../src/providers/naverLoginProvider'

export default function Page() {
  return (
    <Layout>
      <NaverLoginProvider>
        <LoginForm />
      </NaverLoginProvider>
    </Layout>
  )
}
