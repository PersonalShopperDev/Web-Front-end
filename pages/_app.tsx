import { AppProps } from 'next/app'
import Head from 'next/head'
import AuthProvider from 'providers/authProvider'
import 'sass/global.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}
