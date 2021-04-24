import { AppProps } from 'next/app'

const modalContainerID = 'modalContainer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <div id={modalContainerID} />
    </>
  )
}

export function getModalContainer() : HTMLElement {
  return document.getElementById(modalContainerID)
}
