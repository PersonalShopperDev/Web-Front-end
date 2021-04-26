import { useRouter } from 'next/dist/client/router'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface AuthProps {
  user: any
  authenticate: (provider: string, token: string) => void
  signOut: () => void
}

const AuthContext = createContext<AuthProps>(null)

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const [user, setUser] = useState<any>(null)

  const authenticate = (provider: string, token: string) => {
    setUser({
      provider,
      token,
    })
  }

  const signOut = () => {
    setUser(null)
  }

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  const value = {
    user,
    authenticate,
    signOut,
  }

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}
