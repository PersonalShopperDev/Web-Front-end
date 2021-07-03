import React from 'react'
import KaKaoAuthProvider from './kakao'
import NaverAuthProvider from './naver'

export interface ThirdPartyAuthContextProps {
  LoginButton: React.ReactNode
}

export default function IntegratedAuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <KaKaoAuthProvider>
      <NaverAuthProvider>
        {children}
      </NaverAuthProvider>
    </KaKaoAuthProvider>
  )
}
