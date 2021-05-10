import { AppProps } from 'next/app'
import AuthProvider from 'providers/authProvider'

const modalContainerID = 'modalContainer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <div id={modalContainerID} />
    </AuthProvider>
  )
}

export function getModalContainer(): HTMLElement {
  return document.getElementById(modalContainerID)
}
