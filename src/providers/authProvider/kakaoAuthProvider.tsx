import { useRouter } from 'next/dist/client/router'
import React, { createContext, useContext } from 'react'
import { ThridPartyAuthProps, useAuth } from '.'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    Kakao: any
  }
}

interface KaKaoAuthProps extends ThridPartyAuthProps { }

const KakaoAuthContext = createContext<KaKaoAuthProps>(null)
export const useKaKaoAuth = () => useContext(KakaoAuthContext)

export default function KaKaoAuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
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
      fail: (_ : any) => {
        router.push('/login/error')
      },
    })
  }

  const value = {
    LoginButton: () => <button type="submit" onClick={loginHandler}>카카오 로그인</button>,
  }

  return (
    <KakaoAuthContext.Provider value={value}>
      {children}
    </KakaoAuthContext.Provider>
  )
}
