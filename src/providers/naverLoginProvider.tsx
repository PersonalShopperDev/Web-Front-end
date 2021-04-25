import { useRouter } from 'next/dist/client/router'
import React, { createContext, useContext, useEffect } from 'react'
import { useAuth } from './authProvider'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    naver: any
  }
}

interface naverLoginContext {
  // eslint-disable-next-line no-undef
  LoginButton: () => JSX.Element
}

const NaverLoginContext = createContext<naverLoginContext>(null)
export const useNaverLogin = () => useContext(NaverLoginContext)

export default function NaverLoginProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const callbackUrl = '/login/naver/callback'

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
    LoginButton,
  }
  
  return (
    <NaverLoginContext.Provider value={value}>
      {children}
    </NaverLoginContext.Provider>
  )
}

export const useCallbackProcess = () => {
  const router = useRouter()
  const { setUser } = useAuth()

  const getToken = () => router.asPath.split('=')[1].split('&')[0]

  useEffect(() => {
    setUser({
      provider: 'naver',
      token: getToken(),
    })
  }, [])
}

function LoginButton() {
  return <div id="naverIdLogin" />
}
