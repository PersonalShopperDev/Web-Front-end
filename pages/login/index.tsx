import LoginForm from 'components/loginForm'
import Layout from 'layouts/default'
import IntegratedAuthProvider from 'providers/authProvider/integratedAuthProvider'

export default function Page() {
  return (
    <Layout>
      <IntegratedAuthProvider>
        <LoginForm />
      </IntegratedAuthProvider>
    </Layout>
  )
}
