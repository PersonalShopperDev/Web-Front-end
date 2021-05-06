import React, { createContext, useContext } from 'react'
import { useAuth } from './authProvider'

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
  const { authenticate } = useAuth()

  const loginHandler = () => {
    const { Kakao } = window
    if (!Kakao.isInitialized()) {
      Kakao.init(process.env.KAKAO_CLIENT_ID)
    } 
    Kakao.Auth.login({
      success: (auth : any) => {
        authenticate('kakao', auth.access_token)
      },
      fail: (err : any) => {
        console.log(err)
      }
    })
  }

  const value = {
    LoginButton : () => <button type='submit' onClick={loginHandler}>카카오 로그인</button> ,
  }
  
  return (
    <KakaoLoginContext.Provider value={value}>
      {children}
    </KakaoLoginContext.Provider>
  )
}
