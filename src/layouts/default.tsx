import { Fragment } from 'react'

export default function Layout({
  Header,
  Main,
  Navigation,
} : {
  Header? : React.ReactNode,
  Main : React.ReactNode,
  Navigation? : React.ReactNode,
}) {
  return (
    <Fragment>
      <header>
        {Header}
      </header>
      <main>
        {Main}
      </main>
      <nav>
        {Navigation}
      </nav>
    </Fragment>
  )
}