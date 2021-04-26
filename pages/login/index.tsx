import LoginForm from '../../src/components/loginForm'
import Layout from '../../src/layouts/default'
import KaKaoLoginProvider from '../../src/providers/kakaoLoginProvider'
import NaverLoginProvider from '../../src/providers/naverLoginProvider'

export default function Page() {
  return (
    <Layout>
      <NaverLoginProvider>
        <KaKaoLoginProvider>
          <LoginForm />
        </KaKaoLoginProvider>
      </NaverLoginProvider>
    </Layout>
  )
}
