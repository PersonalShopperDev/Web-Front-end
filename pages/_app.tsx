import { AppProps } from 'next/app'
import Head from 'next/head'
import AuthProvider from 'providers/auth'
import ModalProvider from 'providers/modal'
import IntegratedDialogProvider from 'providers/dialog/integrated'
import 'sass/global.scss'
import ChatProvider from 'providers/chat'

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
          <AuthProvider>
            <ChatProvider>
              <Component {...pageProps} />
            </ChatProvider>
          </AuthProvider>
        </IntegratedDialogProvider>
      </ModalProvider>
    </>
  )
}
