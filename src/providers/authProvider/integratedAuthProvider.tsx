import React from 'react'
import KaKaoAuthProvider from './kakaoAuthProvider'
import NaverAuthProvider from './naverAuthProvider'

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
