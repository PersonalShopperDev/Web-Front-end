import '../sass/global.scss'
import { AppProps } from 'next/app'
import { Fragment } from 'react'

const modalContainerID = 'modalContainer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Component {...pageProps} />
      <div id={modalContainerID}></div>
    </Fragment>
  )
}

export function getModalContainer() : HTMLElement {
  return document.getElementById(modalContainerID)
}
