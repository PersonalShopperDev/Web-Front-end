import { NextRouter } from 'next/dist/client/router'
import React, {
  createContext, useContext, useEffect, useRef,
} from 'react'
import NaverLoginButton from 'widgets/naver-login-button'
import { ThirdPartyAuthContextProps } from './integrated'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    naver: any
  }
}

interface NaverAuthContextProps extends ThirdPartyAuthContextProps { }

const NaverAuthContext = createContext<NaverAuthContextProps>(null)
export const useNaverAuth = () => useContext(NaverAuthContext)

export default function NaverAuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const provider = 'naver'

  const callbackUrl = `/login/${provider}/callback`

  const loginButtonRef = useRef<HTMLDivElement>()

  useEffect(() => {
    const { naver } = window
    const loginHandler = new naver.LoginWithNaverId({
      clientId: process.env.NAVER_CLIENT_ID,
      callbackUrl: `${process.env.DOMAIN}${callbackUrl}`,
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

  const loginHandler = () => {
    const loginHref = loginButtonRef.current.firstChild as HTMLAnchorElement
    if (!loginHref) {
      return
    }
    loginHref.click()
  }

  const value = {
    LoginButton: <NaverLoginButton onClick={loginHandler} />,
  }

  return (
    <NaverAuthContext.Provider value={value}>
      <div ref={loginButtonRef} id="naverIdLogin" style={{ display: 'none' }} />
      {children}
    </NaverAuthContext.Provider>
  )
}

export const processToken = (router : NextRouter) : string => {
  try {
    return router.asPath.split('=')[1].split('&')[0]
  } catch {
    return null
  }
}
