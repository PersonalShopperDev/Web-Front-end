import { NextRouter } from 'next/dist/client/router'
import React, { createContext, useContext, useEffect } from 'react'
import { ThridPartyAuthProps } from '.'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    naver: any
  }
}

interface NaverAuthProps extends ThridPartyAuthProps { }

const NaverAuthContext = createContext<NaverAuthProps>(null)
export const useNaverAuth = () => useContext(NaverAuthContext)

export default function NaverAuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const provider = 'naver'

  const callbackUrl = `/login/${provider}/callback`

  useEffect(() => {
    const { naver } = window
    const loginHandler = new naver.LoginWithNaverId({
      clientId: process.env.NAVER_CLIENT_ID,
      callbackUrl: `${window.location.origin}${callbackUrl}`,
      callbackHandle: true,
      isPopup: false,
      loginButton: {
        color: 'green',
        type: 1,
        height: 32,
      },
    })
    loginHandler.init()
  }, [])

  const value = {
    LoginButton: () => <div id="naverIdLogin" />,
  }

  return (
    <NaverAuthContext.Provider value={value}>
      {children}
    </NaverAuthContext.Provider>
  )
}

export const processToken = (router : NextRouter) : string => router.asPath.split('=')[1].split('&')[0]
