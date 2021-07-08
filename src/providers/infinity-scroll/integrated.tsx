import React from 'react'
import LookBookProvider from './look-book'
import UserListProvider from './user-list'
import InfinityScrollProvider from '.'

export default function IntegratedInfinityScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LookBookProvider>
      <UserListProvider>
        <InfinityScrollProvider>
          {children}
        </InfinityScrollProvider>
      </UserListProvider>
    </LookBookProvider>
  )
}
