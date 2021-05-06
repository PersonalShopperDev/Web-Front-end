import { useRouter } from 'next/dist/client/router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import getApiUrl from '../lib/api'

interface User { 
  accessToken : string, 
  refreshToken : string
}

interface AuthProps {
  user: User
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

  const [user, setUser] = useState<User>(null)

  const authenticate = async (provider: string, token: string) => {
    const payload : any = {
        resource : provider,
        token
    }
    await fetch(getApiUrl('auth/login'), {
      body : JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST'
    })
    .then(async (res) => {
      console.log(res)
      if (!res.ok) {
        throw Error((await res.text()))
      }
      return res.json()
    })
    .then(({ accessToken, refreshToken }) => {
      setUser({
        accessToken,
        refreshToken, 
      })
    })
    .catch((error) => {
      console.log(error)
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
