import React from 'react'
import LookBookProvider from './lookBook'
import UserListProvider from './userList'
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
