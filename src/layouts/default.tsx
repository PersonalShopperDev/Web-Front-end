import React from 'react'

export default function Layout({
  children,
  Header,
  Navigation,
}: {
  children: React.ReactNode
  Header?: React.ReactNode
  Navigation?: React.ReactNode
}) {
  return (
    <>
      <header>{Header}</header>
      <main>{children}</main>
      <nav>{Navigation}</nav>
    </>
  )
}

Layout.defaultProps = {
  Header: null,
  Navigation: null,
}
