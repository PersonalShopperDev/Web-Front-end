import { Fragment } from 'react'

export default function Layout({
  children,
} : {
  children: React.ReactNode
}) {
  return (
    <Fragment>
      <header></header>
      <main>
          {children}
      </main>
      <footer></footer>
    </Fragment>
  )
}