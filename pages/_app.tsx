import { AppProps } from 'next/app'
import Head from 'next/head'
import AuthProvider from 'providers/auth'
import IntegratedInfinityScrollProvider from 'providers/infinity-scroll/integrated'
import OnboardingProvider from 'providers/onboarding'
import ModalProvider from 'providers/modal'
import IntegratedDialogProvider from 'providers/dialog/integrated'
import 'sass/global.scss'

const title = '퍼스널 쇼퍼'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ModalProvider>
        <IntegratedDialogProvider>
          <IntegratedInfinityScrollProvider>
            <OnboardingProvider>
              <AuthProvider>
                <Component {...pageProps} />
              </AuthProvider>
            </OnboardingProvider>
          </IntegratedInfinityScrollProvider>
        </IntegratedDialogProvider>
      </ModalProvider>
    </>
  )
}
