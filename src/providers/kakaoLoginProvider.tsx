import { NextRouter } from 'next/dist/client/router'
import React, { createContext, useContext, useEffect } from 'react'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    Kakao: any
  }
}

interface KaKaoLoginProps {
  // eslint-disable-next-line no-undef
  LoginButton: () => JSX.Element
}

const KakaoLoginContext = createContext<KaKaoLoginProps>(null)
export const useKaKaoLogin = () => useContext(KakaoLoginContext)

export default function KaKaoLoginProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const provider = 'kakao'

  const callbackUrl = `/login/${provider}/callback`

  const loginHandler = () => {
    window.Kakao.Auth.authorize({
      redirectUri: `${window.location.origin}${callbackUrl}`,
    })
  }

  useEffect(() => {
    const { Kakao } = window
    if (Kakao.isInitialized()) {
      return
    } 
    Kakao.init(process.env.KAKAO_CLIENT_ID)
  }, [])

  const value = {
    LoginButton : () => <button type='submit' onClick={loginHandler}>카카오 로그인</button> ,
  }
  
  return (
    <KakaoLoginContext.Provider value={value}>
      {children}
    </KakaoLoginContext.Provider>
  )
}

export const processToken = (router : NextRouter) : string => router.query.code as string